import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Spinner, Alert } from 'reactstrap';
import { groupBy, sortBy, map, isEmpty, reduce } from 'lodash';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { ReactComponent as Close } from 'assets/img/close_white.svg';

import CanShow from 'components/layout/canshow';

import OrderArtWorkGroup from './orderArtWorkGroup';
import OrderCustomerBox from './orderCustomerBox';
import OrderArtDelivery from './orderArtDelivery';
import { getOrderWorkLogAction, deleteArtistBudgetOrderAction } from './actions';
import { PERMITTIONS_CONFIG } from 'configs';

const OrderArtWorkBox = ({ order, status, getOrderWorkLog, loading, workLog, hasPoster, artists = [], deleteArtistBudgetOrder }) => {
  useEffect(() => {
    if (order.id) {
      getOrderWorkLog(order.id);
    }
  }, [getOrderWorkLog, order.id]);

  const [tab, setTab] = useState('activity');
  const [artistId, setArtistId] = useState(0);

  useEffect(() => {
    setArtistId(artists[0]?.id);
  }, [artists]);

  const handleDeleteArtistBudget = (artist) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='comfirm_cus'>
            <div className='comfirm_cus__header'>
              <div className='comfirm_cus__titl'>Remove Artist Budget</div>
              <button type='button' onClick={onClose} className='comfirm_cus__close'>
                <div className='icon'>
                  <Close />
                </div>
              </button>
            </div>
            <div className='comfirm_cus__body'>
              <p>
                Are you sure you want to remove <strong>[ {artist?.firstName} ]</strong> from this order?
              </p>
            </div>
            <div className='comfirm_cus__footer text-right'>
              <button className='comfirm_cus__cancel comfirm_cus__control' onClick={onClose}>
                Cancel
              </button>
              <button
                className='comfirm_cus__accept comfirm_cus__control'
                onClick={() => {
                  deleteArtistBudgetOrder(order.id, artist?.budgetId, artist?.index, () => {
                    toast.dark(`[${artist?.firstName}] is removed from this order!`);
                  });
                  onClose();
                }}>
                Accept
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const currentWorkLog = workLog[artistId] || [];

  if (loading || !status.length) {
    return (
      <div style={{ minHeight: '100px' }} className='order_detail__work_list box d-flex align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  }

  const isCurrentArtist = artistId === order?.assignedTo?.id;

  const isNewOrder = order.status === status[0].name || currentWorkLog.length === 1;
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
            {artists.map((art) => {
              const { id, firstName = '', calculatePayout } = art;
              const activityKey = `activity_${id}`;
              const postText = artists.length > 1 ? `(${firstName})` : '';
              const artistWorkLog = workLog[id] || [];
              const artistWorkLogNew = artistWorkLog.length === 1;

              const isAssigning = art?.id === order?.assignedTo?.id;

              return (
                <div className={`d-inline-block order_detail__tab tab ${tab === 'activity' && artistId === id && 'active'}`} key={`order_tab_by_artist_${id}`}>
                  <button
                    key={activityKey}
                    type='button'
                    className='tab__btn'
                    onClick={() => {
                      setTab('activity');
                      setArtistId(id);
                    }}>
                    {`Activity ${postText}`}
                  </button>
                  <CanShow permission={PERMITTIONS_CONFIG.DELETE_ARTIST_BUDGET}>
                    {(artistWorkLogNew || !calculatePayout) && !isAssigning && (
                      <button type='button' className='tab__delete' onClick={() => handleDeleteArtistBudget(art)}>
                        <span className='icon'>
                          <Close />
                        </span>
                      </button>
                    )}
                  </CanShow>
                </div>
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

const mapStateToProps = ({ orderTable, orderDetail, auth }) => {
  const { artistBudgets, assignedTo } = orderDetail.data.order;
  const permissions = auth.data.accountInfo?.permissions || [];
  const canViewArtistTabs = permissions.includes(PERMITTIONS_CONFIG.VIEW_ALL_ARTIST_TABS) || false;

  const artists =
    artistBudgets
      ?.map((item, index) => ({ ...item?.artist, calculatePayout: item?.calculatePayout, budgetId: item.id, index }))
      ?.sort((a) => (a?.id === assignedTo?.id ? -1 : 1))
      ?.filter((item) => {
        if (canViewArtistTabs) {
          return item;
        }
        return item?.id === assignedTo?.id;
      }) || [];

  return {
    status: orderTable.orders.status,
    loading: orderDetail.ui.loadingWorkLog,
    workLog: orderDetail.data.workLog,
    accountInfo: auth.data.accountInfo,
    artists,
    canViewArtistTabs,
  };
};

const mapDispatchToProps = {
  getOrderWorkLog: getOrderWorkLogAction,
  deleteArtistBudgetOrder: deleteArtistBudgetOrderAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderArtWorkBox);
