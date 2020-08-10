import React, { useState, useRef, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Button from 'components/common/button';
import Dropbox from 'components/common/dropbox';
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';
import SelectCreatable from 'react-select/creatable';

const WrapperRow = ({ label = '', children }) => (
  <div className='row pb-3'>
    <div className='col-3 form_label'>{label}</div>
    <div className='col-9'>{children}</div>
  </div>
);

const UploadModal = ({ onClose, onConfirm, orderNumber, item = 1, tagItems = [], isLoading = false }) => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);
  const dropbox = useRef(null);
  const toggle = () => {
    onClose();
  };

  // useEffect(() => {
  //   console.log('====================================');
  //   console.log(tags);
  //   console.log('====================================');
  // }, [tags]);

  const onSave = (e) => {
    // e.preventDefault();
    if (dropbox.current) {
      const files = dropbox.current.getFiles() || [];
      if (!name) {
        toast.warn('Name is required field!');
        return;
      }
      if (!files.length) {
        toast.warn('Please chose one file!');
        return;
      }

      if (files.length !== 1) {
        toast.warn('Please select only one file!');
        return;
      }
      let isDoneUpload = true;
      files.forEach((file) => {
        if (!file.isUploaded || !file.id) {
          isDoneUpload = false;
        }
      });
      if (!isDoneUpload) {
        toast.warn('Files is uploading!');
        return;
      }

      const data = {
        title: name,
        tags: tags.map(({ value, label, __isNew__ }) => {
          if (__isNew__) {
            return { name: label };
          } else {
            return { name: label, id: value };
          }
        }),
        attachmentId: files?.[0]?.id || undefined,
      };
      onConfirm(data, onClose);
    }
  };

  return (
    <form action='' onSubmit={onSave}>
      <Modal isOpen={item !== null} toggle={toggle} fade={false} size='md' className='modal-dialog-centered  modal-no-border'>
        <div className='order_detail__email gallery'>
          <ModalHeader toggle={toggle}>
            Upload Gallery
            <button type='button' className='modal-close' onClick={toggle}>
              <CloseIcon width='25px' height='25px' />
            </button>
          </ModalHeader>
          <ModalBody>
            {isLoading ? (
              <div className={` mb-5`}>
                <div className={`in-page-loading`}>
                  <Spinner /> <span className='text'>Uploading</span>
                </div>
              </div>
            ) : (
              <Fragment>
                <WrapperRow label='Name:'>
                  <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                </WrapperRow>
                <WrapperRow label='Tags:'>
                  <SelectCreatable isMulti options={tagItems} value={tags} onChange={(items) => setTags(items)} />
                </WrapperRow>
                <WrapperRow label='Upload File:'>
                  <Dropbox className='upload' ref={dropbox} id={`Gallery__upload`} quality='low' />
                </WrapperRow>
              </Fragment>
            )}
          </ModalBody>
          <ModalFooter className='justify-content-between'>
            <Button color='secondary' type='button' onClick={onClose}>
              Cancel
            </Button>

            <Button color='primary' type='submit' disabled={isLoading} onClick={onSave} style={{ width: 210 }}>
              Upload
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </form>
  );
};

export default UploadModal;
