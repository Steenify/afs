import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Spinner, Alert } from 'reactstrap';
import { groupBy, map, isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { ReactComponent as Close } from 'assets/img/close_white.svg';

import CanShow from 'components/layout/canshow';

import OrderWorkGroup from './orderWorkGroup';
import OrderArtDelivery from './orderDelivery';
import { deleteArtistBudgetOrderAction, getLastWorkLogStateAction } from './actions';
import { PERMITTIONS_CONFIG } from 'configs';

const OrderWorkBox = ({ item, order, status, loadingWorkLog, workLog, artists = [], deleteArtistBudgetOrder, getLastWorkLogStateAction }) => {
  const [tab, setTab] = useState('activity');
  const [artistId, setArtistId] = useState(0);
  const [lastWorkLogState, setLastWorkLogState] = useState({});

  const worklogToDeliver = (workLog[artists[0]?.id] || []).filter((w) => w.bookingItemId === item.id);

  const currentWorkLog = (workLog[artistId] || []).filter((w) => w.bookingItemId === item.id);

  const isCurrentArtist = artistId === order?.assignedTo?.id;
  const lastWorkLog = currentWorkLog[currentWorkLog.length - 1];

  useEffect(() => {
    setArtistId(artists[0]?.id);
  }, [artists]);

  useEffect(() => {
    if (lastWorkLog) {
      getLastWorkLogStateAction({ flowId: lastWorkLog.wlFlowId, stateName: lastWorkLog.wlState, onSuccess: setLastWorkLogState });
    }
  }, [lastWorkLog, getLastWorkLogStateAction]);

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

  if (loadingWorkLog || !status.length) {
    return (
      <div style={{ minHeight: '100px' }} className='order_detail__work_list box d-flex align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='order_detail__work_list'>
      <div className='row'>
        <div className='col-lg-12'>
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
            {artists.length > 0 && (
              <button
                type='button'
                onClick={() => {
                  setTab('delivery');
                  setArtistId(order?.assignedTo?.id);
                }}
                className={`order_detail__tab ${tab === 'delivery' && artistId === order?.assignedTo?.id && 'active'}`}>
                Delivery
              </button>
            )}
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
                currentWorkLog.map((works, index) => {
                  return (
                    <OrderWorkGroup
                      lastWorkLogState={lastWorkLogState}
                      isCurrentArtist={isCurrentArtist}
                      works={[works]}
                      order={order}
                      item={item}
                      key={`workGroup__item__${index}`}
                      lastWorkLog={lastWorkLog}
                      status={status}
                    />
                  );
                })}
            </div>
          </div>

          <div className={`order_detail__content ${tab === 'delivery' && 'active'} `}>
            <div className='order_detail__delivery box'>
              <OrderArtDelivery
                works={worklogToDeliver}
                order={order}
                // isDeliverable={isDeliverable} works={[...(worklogGroup.EXPORT_FILE || [])]} images={allExportImage}
              />
            </div>
          </div>
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
  deleteArtistBudgetOrder: deleteArtistBudgetOrderAction,
  getLastWorkLogStateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderWorkBox);
