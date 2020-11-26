import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Spinner, Alert } from 'reactstrap';
import { groupBy, sortBy, map, isEmpty, reduce } from 'lodash';

import OrderArtWorkGroup from './orderArtWorkGroup';
import OrderCustomerBox from './orderCustomerBox';
import OrderArtDelivery from './orderArtDelivery';
import { getOrderWorkLogAction } from './actions';
import { PERMITTIONS_CONFIG, WORKFLOW_STATE_TYPE } from 'configs';

const OrderArtWorkBox = ({ item, order, status, loadingWorkLog, workLog, hasPoster, artists = [] }) => {
  const [tab, setTab] = useState('activity');
  const [artistId, setArtistId] = useState();
  const [currentWorkLog, setCurrentWorkLog] = useState([]);

  useEffect(() => {
    setArtistId(artists[0]?.id);
  }, [artists.length]);

  useEffect(() => {
    const worklogs = (workLog[artistId] || []).filter((w) => w.bookingItemId === item.id);
    setCurrentWorkLog(worklogs);
  }, [artistId, workLog, item.id]);

  if (loadingWorkLog || !status.length) {
    return (
      <div style={{ minHeight: '100px' }} className='order_detail__work_list box d-flex align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  }

  const isCurrentArtist = artistId === order?.assignedTo?.id;
  const isNewOrder = currentWorkLog.length === 1 && currentWorkLog[0]?.wlStateType === WORKFLOW_STATE_TYPE.START;
  const isDeliverable = currentWorkLog.find((w) => w.wlStateType === WORKFLOW_STATE_TYPE.DONE);
  const lastWorkLog = currentWorkLog[currentWorkLog.length - 1];
  const worklogGroupedByState = groupBy(currentWorkLog, 'wlState');
  console.log('🚀 ~ file: orderArtWorkBox.js ~ line 39 ~ OrderArtWorkBox ~ worklogGroup', worklogGroupedByState);

  // const allExportImage = reduce(
  //   EXPORT_FILE,
  //   (list, item) => {
  //     return [...list, ...item.attachments];
  //   },
  //   [],
  // );

  return (
    <div className='order_detail__work_list'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='order_detail__tabs'>
            {artists.map(({ id, firstName = '' }) => {
              const activityKey = `activity_${id}`;
              const postText = artists.length > 1 ? `(${firstName})` : '';
              return (
                <button
                  key={activityKey}
                  type='button'
                  onClick={() => {
                    setTab('activity');
                    setArtistId(id);
                  }}
                  className={`order_detail__tab ${tab === 'activity' && artistId === id && 'active'}`}>
                  {`Activity ${postText}`}
                </button>
              );
            })}
            <button
              type='button'
              onClick={() => {
                setTab('delivery');
                setArtistId(order?.assignedTo?.id);
              }}
              className={`order_detail__tab ${tab === 'delivery' && artistId === order?.assignedTo?.id && 'active'}`}>
              Delivery
            </button>
          </div>
        </div>

        <div className='col-lg-12'>
          <div className={`order_detail__content ${tab === 'activity' && 'active'} `}>
            <div className='order_detail__work_items box'>
              {isEmpty(order.assignedTo) && (
                <Alert color='warning'>
                  <h3 className='text-center'>Order not assigned to Artist</h3>
                </Alert>
              )}

              {!isEmpty(order.assignedTo) &&
                map(worklogGroupedByState, (works, key) => {
                  return (
                    <OrderArtWorkGroup
                      hasPoster={hasPoster}
                      isNewOrder={isNewOrder}
                      isCurrentArtist={isCurrentArtist}
                      works={works}
                      order={order}
                      group={key}
                      key={`workGroup__item__${key}`}
                      lastWorkLog={lastWorkLog}
                      status={status}
                    />
                  );
                })}
            </div>
          </div>

          <div className={`order_detail__content ${tab === 'delivery' && 'active'} `}>
            <div className='order_detail__delivery box'>
              {/* <OrderArtDelivery isDeliverable={isDeliverable} works={[...(worklogGroup.EXPORT_FILE || [])]} order={order} images={allExportImage} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ orderTable, orderDetail, auth }, ownProps) => ({
  status: orderTable.orders.status,
  loadingWorkLog: orderDetail.ui.loadingWorkLog,
  workLog: orderDetail.data.workLog,
  accountInfo: auth.data.accountInfo,
  artists:
    orderDetail.data.order?.artistBudgets
      ?.map?.((item) => item?.artist)
      ?.sort((a) => (a?.id === ownProps?.order?.assignedTo?.id ? -1 : 1))
      ?.filter?.((item) => {
        const permissions = auth?.data?.accountInfo?.permissions || [];
        if (permissions.includes(PERMITTIONS_CONFIG.VIEW_ALL_ARTIST_TABS)) {
          return item;
        }
        return item?.id === ownProps?.order?.assignedTo?.id;
      }) || [],
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderArtWorkBox);
