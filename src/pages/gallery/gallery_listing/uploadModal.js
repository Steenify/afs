import React, { useState, useRef } from 'react';
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

const UploadModal = ({ onClose, onConfirm, item, tagItems = [], isLoading = false }) => {
  const [name, setName] = useState(item?.title || '');
  const [description, setDescription] = useState(item?.description || '');
  const [destinationLink, setDestinationLink] = useState(item?.destinationLink || '');
  const [tags, setTags] = useState(item?.tags?.map((tag) => ({ value: tag?.id, label: tag?.name })) || []);
  const [attachment, setAttachment] = useState(item?.attachment || null);
  const dropbox = useRef(null);
  const toggle = () => {
    onClose();
  };

  const onSave = () => {
    if (dropbox.current) {
      const files = dropbox.current.getFiles() || [];
      if (!name) {
        toast.warn('Name is required field!');
        return;
      }
      if (!files.length && !attachment) {
        toast.warn('Please chose one file!');
        return;
      }

      if (files.length > 1) {
        toast.warn('Please select only one file!');
        return;
      }
      if (!destinationLink) {
        toast.warn('Destination Link is required field!');
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
        attachmentId: files?.[0]?.id || attachment?.id || undefined,
        description,
        destinationLink,
        id: item?.id,
      };
      onConfirm(data, onClose);
    }
  };

  return (
    <form action='' onSubmit={onSave}>
      <Modal isOpen={item !== null} toggle={toggle} fade={false} size='lg' className='modal-dialog-centered  modal-no-border'>
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
              <>
                <WrapperRow label='Name:'>
                  <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                </WrapperRow>
                <WrapperRow label='Tags:'>
                  <SelectCreatable isMulti options={tagItems} value={tags} onChange={(items) => setTags(items)} formatCreateLabel={(input) => `Add tag "${input}"`} />
                </WrapperRow>
                <WrapperRow label='Description:'>
                  <textarea style={{ height: '150px' }} type='text' className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} />
                </WrapperRow>
                <WrapperRow label='Upload File:'>
                  <div className={`${!attachment && 'd-none'}`}>
                    <div className='upload-file__list p-0'>
                      <div className='upload-file__items'>
                        <div className='file-item'>
                          <div className={`image__file file-item__img`}>{attachment && <img src={attachment?.url} alt={attachment?.fileName} />}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Dropbox className='upload' ref={dropbox} id={`Gallery__upload`} quality='low' orderNumber='artwork' handleChangeFiles={() => setAttachment(null)} />
                </WrapperRow>
                <WrapperRow label='Destination Link:'>
                  <input type='text' className='form-control' value={destinationLink} onChange={(e) => setDestinationLink(e.target.value)} />
                </WrapperRow>
              </>
            )}
          </ModalBody>
          <ModalFooter className='justify-content-between'>
            <Button color='secondary' type='button' onClick={onClose}>
              Cancel
            </Button>

            <Button color='primary' type='submit' disabled={isLoading} onClick={onSave} style={{ width: 210 }}>
              {item ? 'Save' : 'Upload'}
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </form>
  );
};

export default UploadModal;
