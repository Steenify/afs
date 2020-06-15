import React, { Component } from 'react';
import { findIndex } from 'lodash';

import Loading from 'components/common/Loading';

import { ReactComponent as Upload } from 'assets/img/upload.svg';
import { ReactComponent as Close } from 'assets/img/close.svg';

import { uploadService } from 'services/attachment';
import { actionTryCatchCreator, getUniqueID } from 'utils';

import ImageFile from '../imageFile';

import './style.scss';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      text: '',
    };
    this.pasteRef = React.createRef();
  }

  componentDidMount() {
    const input = this.pasteRef.current;
    input.addEventListener('paste', this.handlePaste);
  }

  componentWillUnmount() {
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
    const data = new FormData();
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

  handleChangeText = (e) => {
    const { value } = e.target;
    this.setState({
      text: value,
    });
  };

  render() {
    const { fileList, text } = this.state;
    const { disabled, id, className } = this.props;
    return (
      <div className='comment_box'>
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

        <input
          type='text'
          placeholder='Enter comment here...'
          className='form-control'
          value={text}
          ref={this.pasteRef}
        />

        <label className=''>
          <input
            multiple
            type='file'
            name='files[]'
            className='sr-only'
            disabled={disabled || false}
            accept={'image/*'}
            onChange={this.handleChangeFiles}
          />
        </label>
      </div>
    );
  }
}

CommentBox.defaultProps = {
  className: '',
  id: 'comment',
};

export default CommentBox;
