import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Spinner, Alert } from 'reactstrap';
import { groupBy, sortBy, map, isEmpty, reduce } from 'lodash';

import OrderArtWorkGroup from './orderArtWorkGroup';
import OrderCustomerBox from './orderCustomerBox';
import OrderArtDelivery from './orderArtDelivery';
import { getOrderWorkLogAction } from './actions';
import { mapRoles } from 'configs';

const OrderArtWorkBox = ({ order, status, getOrderWorkLog, loading, workLog, hasPoster, artists = [] }) => {
  useEffect(() => {
    if (order.id) {
      getOrderWorkLog(order.id);
    }
  }, [getOrderWorkLog, order.id]);

  const [tab, setTab] = useState('activity');
  const [artistId, setArtistId] = useState();
  const [currentWorkLog, setCurrentWorkLog] = useState([]);

  useEffect(() => {
    setArtistId(artists[0]?.id);
  }, [artists.length]);

  useEffect(() => {
    setCurrentWorkLog(workLog[artistId] || []);
  }, [artistId, workLog]);

  if (loading || !status.length) {
    return (
      <div style={{ minHeight: '100px' }} className='order_detail__work_list box d-flex align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  }

  const isNewOrder = currentWorkLog.length === 2;
  const lastWorkLog = currentWorkLog[currentWorkLog.length - 1];
  const worklogGroup = groupBy(currentWorkLog, 'status');

  const NEW_ORDER = [...(worklogGroup.NEW_ORDER || [])];

  const SKETCH = sortBy([...(worklogGroup.SKETCH || []), ...(worklogGroup.SKETCH_REVIEW || []), ...(worklogGroup.SKETCH_EDIT || [])], (skethItem) => new Date(skethItem.createdDate));

  const COLOR = sortBy([...(worklogGroup.COLOR || []), ...(worklogGroup.COLOR_REVIEW || []), ...(worklogGroup.COLOR_EDIT || [])], (colorItem) => new Date(colorItem.createdDate));

  const EXPORT_FILE = sortBy([...(worklogGroup.EXPORT_FILE || []), ...(worklogGroup.SEND_FILE || [])], (exportItem) => new Date(exportItem.createdDate));

  const DONE = [...(worklogGroup.DONE || [])];

  const WorkGrouped = {
    NEW_ORDER,
    SKETCH,
    COLOR,
    EXPORT_FILE,
    DONE,
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
  if (!DONE.length) {
    delete WorkGrouped.DONE;
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
            {artists.map(({ id, firstName = '' }) => {
              const activityKey = `activity_${id}`;
              const deliveryKey = `delivery_${id}`;
              const postText = artists.length > 1 ? `(${firstName})` : '';
              return (
                <Fragment key={`order_tab_by_artist_${id}`}>
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
                  {/* <button
                    key={deliveryKey}
                    type='button'
                    onClick={() => {
                      setTab('delivery');
                      setArtistId(id);
                    }}
                    className={`order_detail__tab ${tab === 'delivery' && artistId === id && 'active'}`}>
                    {`Delivery ${postText}`}
                  </button> */}
                </Fragment>
              );
            })}
            {/* <button type='button' onClick={() => setTab('activity')} className={`order_detail__tab ${tab === 'activity' && 'active'}`}>
              Activity
            </button> */}
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

        <div className='col-lg-8'>
          <div className={`order_detail__content ${tab === 'activity' && 'active'} `}>
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
                      hasPoster={hasPoster}
                      isNewOrder={isNewOrder}
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
              {!EXPORT_FILE.length && (
                <Alert color='warning'>
                  <h3 className='text-center'>No Deliverables</h3>
                </Alert>
              )}

              {EXPORT_FILE.length > 0 && <OrderArtDelivery works={[...(worklogGroup.EXPORT_FILE || [])]} order={order} images={allExportImage} />}
            </div>
          </div>
        </div>

        <div className='col-lg-4 order_detail__customer_box'>
          <OrderCustomerBox order={order} customer={order.customer} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ orderTable, orderDetail, auth }, ownProps) => ({
  status: orderTable.orders.status,
  loading: orderDetail.ui.loadingWorkLog,
  workLog: orderDetail.data.workLog,
  accountInfo: auth.data.accountInfo,
  artists:
    orderDetail.data.order?.artistBudgets
      ?.map?.((item) => item?.artist)
      ?.sort((a) => (a?.id === ownProps?.order?.assignedTo?.id ? -1 : 1))
      ?.filter?.((item) => {
        const authorities = auth?.data?.accountInfo?.authorities || [];
        if (authorities.includes(mapRoles.ROLE_ARTIST)) {
          return item?.id === ownProps?.order?.assignedTo?.id;
        }
        return item;
      }) || [],
});

const mapDispatchToProps = {
  getOrderWorkLog: getOrderWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderArtWorkBox);
