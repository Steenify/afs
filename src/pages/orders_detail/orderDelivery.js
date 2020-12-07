import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { findIndex } from 'lodash';
import { Alert } from 'reactstrap';

import ImageGallery from 'components/common/imageGallery';
import Dropbox from 'components/common/dropbox';
import Button from 'components/common/button';

import { getListImageUrl, getSelectedStatus } from 'utils';
import { PERMITTIONS_CONFIG } from 'configs';

import { uploadFileWorkLogAction, deleteFileDeliveryAction, getNotifyTemplatesAction } from './actions';

const OrderArtDelivery = ({ uiComponents, order, works, workLog, uploadFileWorkLog, deleteFileDelivery, accountInfo, status, getNotifyTemplatesAction }) => {
  const dropbox = useRef(null);

  const isDeliverable = works?.[works.length - 1]?.deliverable;

  const exportWorklogs = works.filter((w) => uiComponents?.find((i) => i.name === w.component)?.canExportFile);
  const images = exportWorklogs.reduce((list, item) => [...list, ...item.attachments], []);
  const lastExport = exportWorklogs[exportWorklogs.length - 1];
  const workLogIndex = findIndex(workLog[lastExport?.artist?.id] || [], (log) => log.id === lastExport?.id);

  const canModifyDelivery = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.MODIFY_DELIVERY) || false;
  const canNotifyCustomer = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.NOTIFY_BOOKING_TO_CUSTOMER) || false;

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
          thumbnailLink: file?.thumbnailLink,
          url: file?.url,
          external: file?.external,
        })),
      };

      uploadFileWorkLog(
        order.id,
        lastExport?.id,
        data,
        workLogIndex,
        files,
        () => {
          dropbox.current.clearFiles();
        },
        lastExport?.artist?.id,
      );
    }
  };

  const handleDeleteFile = (file, fileIndex) => {
    deleteFileDelivery(order.id, file?.source?.id, workLogIndex, fileIndex, () => toast.dark('File deleteted!'), lastExport?.artist?.id);
  };

  const handleNotifyEmail = () => {
    const currentStatus = getSelectedStatus('SEND_FILE', status);
    if (currentStatus.emailTemplates && currentStatus.emailTemplates.length) {
      getNotifyTemplatesAction(order.id, currentStatus.emailTemplates[0].id, workLogIndex, undefined, lastExport?.artist?.id);
    } else {
      toast.warn('No Email template found!');
    }
  };

  if (!isDeliverable) {
    return (
      <Alert color='warning'>
        <h3 className='text-center'>No Deliverables</h3>
      </Alert>
    );
  }

  return (
    <div className='deli__body'>
      <div className='box__header mb-2'>
        <div className='box__title'>Links</div>
      </div>
      <div className='input-group clipboad mb-3'>
        <input type='text' className='form-control clipboad__input' value={`https://drive.google.com/drive/folders/${order?.finalDriveId || ''}`} onChange={() => {}} placeholder='Google Link' />
        <CopyToClipboard text={`https://drive.google.com/drive/folders/${order?.finalDriveId || ''}`} onCopy={() => toast.dark('Copied')}>
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
        <ImageGallery images={getListImageUrl(images)} alt={'Order Delivery'} caption={'Order Delivery'} canDelete={canModifyDelivery} onDelete={handleDeleteFile} />
      </div>
      {canModifyDelivery && (
        <div className='deli__edit mt-3'>
          <Dropbox className='upload' ref={dropbox} finalDriveId={order.finalDriveId} orderNumber={order.number} id={`work_log__delivery__update`} />
          <div className='order_detail__ctas d-flex flex-wrap justify-content-between text-right'>
            <div>
              {canNotifyCustomer && (
                <Button color='primary' onClick={handleNotifyEmail} className='cta cta2 mb-3 order_detail__notify' type='button'>
                  Notify Customer
                </Button>
              )}
            </div>

            <Button onClick={handleUploadSketch} color='primary' className='cta cta2' type='button'>
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ orderDetail, auth, orderTable, uiComponents }) => ({
  workLog: orderDetail.data.workLog,
  accountInfo: auth.data.accountInfo,
  status: orderTable.orders.status,
  uiComponents: uiComponents.data.components,
});

const mapDispatchToProps = {
  uploadFileWorkLog: uploadFileWorkLogAction,
  deleteFileDelivery: deleteFileDeliveryAction,
  getNotifyTemplatesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderArtDelivery);
