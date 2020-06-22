import React, { Component } from 'react';
import { findIndex } from 'lodash';

import Loading from 'components/common/Loading';

import { ReactComponent as Upload } from 'assets/img/upload.svg';
import { ReactComponent as Close } from 'assets/img/close.svg';

import { uploadService } from 'services/attachment';
import { actionTryCatchCreator, getUniqueID } from 'utils';

import ImageFile from '../imageFile';

import './style.scss';

class DropBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
    this.dropRef = React.createRef();
    this.pasteRef = React.createRef();
  }

  componentDidMount() {
    const div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
    div.addEventListener('paste', this.handlePaste);
    const input = this.pasteRef.current;
    input.addEventListener('paste', this.handlePaste);
  }

  componentWillUnmount() {
    const div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
    const input = this.pasteRef.current;
    input.removeEventListener('paste', this.handlePaste);
  }

  handlePaste = (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData)?.items;
    if (items && items.length) {
      let itemsList = [];
      for (let index in items) {
        var item = items[index];
        if (item.kind === 'file') {
          var blob = item.getAsFile();
          itemsList.push({
            file: blob,
            isUploaded: false,
            isUploading: false,
            name: blob.name,
            id: '',
            uui: getUniqueID(),
          });
        }
      }
      if (itemsList.length) {
        this.handleFiles(itemsList);
      }
    }
  };

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((fi) => {
        return {
          file: fi,
          isUploaded: false,
          isUploading: false,
          name: fi.name,
          id: '',
          uui: getUniqueID(),
        };
      });
      this.handleFiles(newFiles);
    }
  };

  handleChangeFiles = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.target.files).map((fi) => {
      return {
        file: fi,
        isUploaded: false,
        isUploading: false,
        id: '',
        name: fi.name,
        uui: getUniqueID(),
      };
    });
    this.handleFiles(newFiles);
  };

  handleFiles = (newFiles) => {
    const { fileList } = this.state;
    const newList = [...fileList, ...newFiles];
    this.setState({ fileList: newList }, () => {
      this.handleCheckfile();
    });
  };

  getFiles = () => {
    const { fileList } = this.state;
    return fileList;
  };

  clearFiles = () => {
    this.setState({
      fileList: [],
    });
  };

  onDeleteFile = (index) => {
    const { fileList } = this.state;
    const temp = [...fileList];
    temp.splice(index, 1);
    this.setState({ fileList: temp });
  };

  handleCheckfile = () => {
    const { fileList } = this.state;
    let newList = [];
    fileList.forEach((item) => {
      const itemNew = { ...item };
      if (!item.isUploaded && !item.isUploading) {
        itemNew.isUploading = true;
        this.handleUploadFile(item.file, item.uui);
      }
      newList.push(itemNew);
    });
    this.setState({ fileList: newList });
  };

  handleUploadFile = (file, uui) => {
    const { finalDriveId } = this.props;
    const data = new FormData();
    if (finalDriveId) {
      data.append('driveId', finalDriveId);
    }
    data.append('file', file);

    const onPending = () => {};
    const onSuccess = (data) => {
      const { fileList } = this.state;
      const fileIndex = findIndex(fileList, (item) => item.uui === uui);
      if (fileIndex !== -1) {
        const newList = [...fileList];
        newList[fileIndex].isUploaded = true;
        newList[fileIndex].isUploading = false;
        newList[fileIndex] = { ...newList[fileIndex], ...data[0] };
        this.setState({ fileList: newList });
      }
    };
    const onError = (error) => {
      console.log('handleUploadFile onError -> error', error);
    };

    actionTryCatchCreator({
      service: uploadService(data),
      onPending,
      onSuccess,
      onError,
    });
  };

  render() {
    const { fileList } = this.state;
    const { disabled, id, className } = this.props;
    return (
      <>
        <div className={`${!fileList.length && 'd-none'}`}>
          <div className='upload-file__list'>
            <div className='upload-file__items'>
              {fileList.length &&
                fileList.map((item, index) => (
                  <div
                    className='file-item'
                    key={`image_upload__${
                      item.file.name
                    }__${index.toString()}`}>
                    {!item.isUploaded && (
                      <Loading className='file-item__loading' />
                    )}
                    <ImageFile className='file-item__img' file={item.file} />
                    <button
                      type='button'
                      className='file-item__delete'
                      onClick={() => this.onDeleteFile(index)}>
                      <Close className='icon' />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={`upload-file ${className || ''}`} ref={this.dropRef}>
          <label
            htmlFor={`file-upload__${id || ''}`}
            className='upload-file__form'>
            <div className='content'>
              <span className='custom-file-upload'>
                <div className='icon'>
                  <Upload />
                </div>
              </span>
              <span className='custom-file-upload'>
                Drag & Drop or Click to Upload
              </span>
              <input
                multiple
                type='file'
                name='files[]'
                id={`file-upload__${id || ''}`}
                className='sr-only'
                disabled={disabled || false}
                accept={'image/*,image/vnd.adobe.photoshop'}
                onChange={this.handleChangeFiles}
              />
            </div>
          </label>
        </div>
        <input
          type='text'
          placeholder='Paste your image here'
          className='form-control upload-file__input'
          ref={this.pasteRef}
        />
      </>
    );
  }
}

DropBox.defaultProps = {
  finalDriveId: '',
};

export default DropBox;
