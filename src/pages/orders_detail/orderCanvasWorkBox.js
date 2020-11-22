import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { groupBy, sortBy, map } from 'lodash';

import OrderCanvasWorkGroup from './orderCanvasWorkGroup';
// import OrderCanvasDelivery from './orderCanvasDelivery';
import { getOrderCanvasWorkLogAction } from './actions';

const OrderCanvasWorkBox = ({ order, status, getOrderCanvasWorkLogAction, loading, workLog }) => {
  useEffect(() => {
    if (order.id) {
      getOrderCanvasWorkLogAction(order.id);
    }
  }, [getOrderCanvasWorkLogAction, order.id]);

  const [tab, setTab] = useState('activity');

  if (loading || !status.length) {
    return (
      <div style={{ minHeight: '100px' }} className='order_detail__work_list box d-flex align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  }

  const isNewOrder = workLog[0]?.status === 'NEW_ORDER';
  const lastWorkLog = workLog[workLog.length - 1];
  const worklogGroup = groupBy(workLog, 'status');

  const NEW_ORDER = [...(worklogGroup.NEW_ORDER || [])];
  const PRINT_PREVIEW = sortBy([...(worklogGroup.PRINT_PREVIEW || [])], (item) => new Date(item.createdDate));
  const PRINT_TRACKING = sortBy([...(worklogGroup.PRINT_TRACKING || [])], (item) => new Date(item.createdDate));
  const PRINT_RECEIVED = sortBy([...(worklogGroup.PRINT_RECEIVED || [])], (item) => new Date(item.createdDate));
  const DONE = [...(worklogGroup.DONE || [])];

  const WorkGrouped = {
    NEW_ORDER,
    PRINT_PREVIEW,
    PRINT_TRACKING,
    PRINT_RECEIVED,
    DONE,
  };

  if (!NEW_ORDER.length) {
    delete WorkGrouped.NEW_ORDER;
  }

  if (!PRINT_PREVIEW.length) {
    delete WorkGrouped.PRINT_PREVIEW;
  }
  if (!PRINT_TRACKING.length) {
    delete WorkGrouped.PRINT_TRACKING;
  }
  if (!PRINT_RECEIVED.length) {
    delete WorkGrouped.PRINT_RECEIVED;
  }
  if (!DONE.length) {
    delete WorkGrouped.DONE;
  }

  return (
    <div className='order_detail__work_list'>
      <div className='row'>
        <div className='col-lg-8'>
          <div className='order_detail__tabs'>
            <button type='button' onClick={() => setTab('activity')} className={`order_detail__tab ${tab === 'activity' && 'active'}`}>
              Activity
            </button>
            {/* <button type='button' onClick={() => setTab('delivery')} className={`order_detail__tab ${tab === 'delivery' && 'active'}`}>
              Delivery
            </button> */}
          </div>
        </div>

        {(order.status === 'SEND_FILE' || order.status === 'DONE') && Object.keys(WorkGrouped).length > 0 && (
          <div className='col-lg-8'>
            <div className={`order_detail__content ${tab === 'activity' && 'active'} `}>
              <div className='order_detail__work_items box'>
                {map(WorkGrouped, (works, key) => {
                  return <OrderCanvasWorkGroup isNewOrder={isNewOrder} works={works} order={order} group={key} key={`workGroup__item__${key}`} lastWorkLog={lastWorkLog} status={status} />;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ orderTable, orderDetail, auth }) => {
  // const workLog = [...orderDetail.data.canvasWorkLog];
  return {
    status: orderTable.orders.status,
    loading: orderDetail.ui.loadingCanvasWorkLog,
    workLog: orderDetail.data.canvasWorkLog,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  getOrderCanvasWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCanvasWorkBox);
