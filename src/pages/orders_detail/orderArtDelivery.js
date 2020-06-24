import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { findIndex } from 'lodash';

import ImageGallery from 'components/common/imageGallery';
import Dropbox from 'components/common/dropbox';
import Button from 'components/common/button';

import { getListImageUrl } from 'utils';
import { PERMITTIONS_CONFIG } from 'config';

import { uploadFileWorkLogAction, deleteFileDeliveryAction } from './actions';

const OrderArtDelivery = ({
  order,
  images,
  works,
  workLog,
  uploadFileWorkLog,
  deleteFileDelivery,
  accountInfo,
}) => {
  const dropbox = useRef(null);

  const lastExport = works[works.length - 1];
  const workLogIndex = findIndex(workLog, (log) => log.id === lastExport?.id);

  const canModifyDelivery =
    accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.MODIFY_DELIVERY) ||
    false;

  const handleUploadSketch = () => {
    if (dropbox.current) {
      const files = dropbox.current.getFiles();
      if (!files.length) {
        toast.warn('Please select your work!');
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
        attachments: files.map((file) => ({
          id: file.id,
          fileId: file?.fileId,
          thumbnailLink: file?.thumbnailLink,
          url: file?.url,
          external: file?.external,
        })),
      };

      uploadFileWorkLog(
        order.id,
        lastExport.id,
        data,
        workLogIndex,
        files,
        () => {
          dropbox.current.clearFiles();
        },
      );
    }
  };

  const handleDeleteFile = (file, fileIndex) => {
    deleteFileDelivery(
      order.id,
      file?.source?.id,
      workLogIndex,
      fileIndex,
      () => {
        toast.success('File deleteted!');
      },
    );
  };

  return (
    <div className='deli__body'>
      <div className='box__header mb-2'>
        <div className='box__title'>Links</div>
      </div>
      <div className='input-group clipboad mb-3'>
        <input
          type='text'
          className='form-control clipboad__input'
          value={`https://drive.google.com/drive/folders/${
            order?.finalDriveId || ''
          }`}
          onChange={() => {}}
          placeholder='Google Link'
        />
        <CopyToClipboard
          text={`https://drive.google.com/drive/folders/${
            order?.finalDriveId || ''
          }`}
          onCopy={() => toast.success('Copied')}>
          <div className='input-group-append clipboad__input'>
            <span className='input-group-text'>Copy</span>
          </div>
        </CopyToClipboard>
      </div>
      <div className='box__device'></div>
      <div className='box__header mb-2'>
        <div className='box__title'>Photos</div>
      </div>
      <div className='deli__photos'>
        <ImageGallery
          images={getListImageUrl(images)}
          alt={'Order Delivery'}
          caption={'Order Delivery'}
          canDelete={canModifyDelivery}
          onDelete={handleDeleteFile}
        />
      </div>
      {canModifyDelivery && (
        <div className='deli__edit mt-3'>
          <Dropbox
            className='upload'
            ref={dropbox}
            finalDriveId={order.finalDriveId}
            id={`work_log__delivery__update`}
          />
          <div className='order_detail__ctas text-right'>
            <Button
              onClick={handleUploadSketch}
              color='primary'
              className='cta cta2'
              type='button'>
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ orderDetail }) => ({
  workLog: orderDetail.data.workLog,
});

const mapDispatchToProps = {
  uploadFileWorkLog: uploadFileWorkLogAction,
  deleteFileDelivery: deleteFileDeliveryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderArtDelivery);
