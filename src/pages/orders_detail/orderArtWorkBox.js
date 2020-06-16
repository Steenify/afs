import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Spinner, Alert } from 'reactstrap';
import { groupBy, sortBy, map, isEmpty, reduce } from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import ImageGallery from 'components/common/imageGallery';

import { getListImageUrl } from 'utils';

import OrderArtWorkGroup from './orderArtWorkGroup';
import OrderCustomerBox from './orderCustomerBox';
import { getOrderWorkLogAction } from './actions';

const OrderArtWorkBox = ({
  order,
  status,
  getOrderWorkLog,
  loading,
  workLog,
}) => {
  useEffect(() => {
    if (order.id) {
      getOrderWorkLog(order.id);
    }
  }, [getOrderWorkLog, order.id]);

  const [tab, setTab] = useState('activity');

  if (loading || !status.length) {
    return (
      <div
        style={{ minHeight: '100px' }}
        className='order_detail__work_list box d-flex align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  }

  const isNewOrder = workLog.length === 1;
  const worklogGroup = groupBy(workLog, 'status');
  delete worklogGroup.DONE;

  const NEW_ORDER = [...(worklogGroup.NEW_ORDER || [])];

  const SKETCH = sortBy(
    [
      ...(worklogGroup.SKETCH || []),
      ...(worklogGroup.SKETCH_REVIEW || []),
      ...(worklogGroup.SKETCH_EDIT || []),
    ],
    (skethItem) => new Date(skethItem.createdDate),
  );

  const COLOR = sortBy(
    [
      ...(worklogGroup.COLOR || []),
      ...(worklogGroup.COLOR_REVIEW || []),
      ...(worklogGroup.COLOR_EDIT || []),
    ],
    (colorItem) => new Date(colorItem.createdDate),
  );

  const EXPORT_FILE = sortBy(
    [...(worklogGroup.EXPORT_FILE || []), ...(worklogGroup.SEND_FILE || [])],
    (exportItem) => new Date(exportItem.createdDate),
  );

  const WorkGrouped = {
    NEW_ORDER,
    SKETCH,
    COLOR,
    EXPORT_FILE,
  };

  if (!SKETCH.length) {
    delete WorkGrouped.SKETCH;
  }
  if (!COLOR.length) {
    delete WorkGrouped.COLOR;
  }
  if (!EXPORT_FILE.length) {
    delete WorkGrouped.EXPORT_FILE;
  }

  const allExportImage = reduce(
    EXPORT_FILE,
    (list, item) => {
      return [...list, ...item.attachments];
    },
    [],
  );

  return (
    <div className='order_detail__work_list'>
      <div className='row'>
        <div className='col-lg-8'>
          <div className='order_detail__tabs'>
            <button
              type='button'
              onClick={() => setTab('activity')}
              className={`order_detail__tab ${tab === 'activity' && 'active'}`}>
              Activity
            </button>
            <button
              type='button'
              onClick={() => setTab('delivery')}
              className={`order_detail__tab ${tab === 'delivery' && 'active'}`}>
              Delivery
            </button>
          </div>
        </div>

        <div className='col-lg-8'>
          <div
            className={`order_detail__content ${
              tab === 'activity' && 'active'
            } `}>
            <div className='order_detail__work_items box'>
              {isEmpty(order.assignedTo) && (
                <Alert color='warning'>
                  <h3 className='text-center'>Order not assigned to Artist</h3>
                </Alert>
              )}

              {!isEmpty(order.assignedTo) &&
                map(WorkGrouped, (works, key) => {
                  return (
                    <OrderArtWorkGroup
                      isNewOrder={isNewOrder}
                      works={works}
                      order={order}
                      group={key}
                      key={`workGroup__item__${key}`}
                      status={status}
                    />
                  );
                })}
            </div>
          </div>

          <div
            className={`order_detail__content ${
              tab === 'delivery' && 'active'
            } `}>
            <div className='order_detail__delivery box'>
              {!EXPORT_FILE.length && (
                <Alert color='warning'>
                  <h3 className='text-center'>No Deliverables</h3>
                </Alert>
              )}

              {EXPORT_FILE.length > 0 && (
                <div className='deli__body'>
                  <div className='box__header mb-2'>
                    <div className='box__title'>Links</div>
                  </div>
                  <div className='input-group clipboad mb-3'>
                    <input
                      type='text'
                      className='form-control clipboad__input'
                      value={order?.finalDriveId || ''}
                      onChange={() => {}}
                      placeholder='Google Link'
                    />
                    <CopyToClipboard
                      text={order.finalDriveId}
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
                      images={getListImageUrl(allExportImage)}
                      alt={'Order Delivery'}
                      caption={'Order Delivery'}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='col-lg-4'>
          <div className='d-none d-lg-block'>
            <OrderCustomerBox order={order} customer={order.customer} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ order, orderDetail, auth }) => ({
  status: order.status,
  loading: orderDetail.ui.loadingWorkLog,
  workLog: orderDetail.data.workLog,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {
  getOrderWorkLog: getOrderWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderArtWorkBox);
