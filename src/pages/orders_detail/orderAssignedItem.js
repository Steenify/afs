import React from 'react';
import { connect } from 'react-redux';

import CanShow from 'components/layout/canshow';

import { formatMoney } from 'utils';
import { isEmpty, findIndex } from 'lodash';

import { ReactComponent as AssignedIcon } from 'assets/img/assigned.svg';
import { ReactComponent as InfoIC } from 'assets/img/info.svg';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs } from 'pages/orders_detail/actions';

import { PERMITTIONS_CONFIG } from 'configs';

import PreviousArtistBudget from './previousArtistBudget';

const OrderAssignedItem = ({ order, updateShowAssignedBoxAction, accountInfo }) => {
  const { assignedTo, artistBudgets = [] } = order || {};
  const { login } = accountInfo;

  const canViewAllArtistTabs = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_ALL_ARTIST_TABS) || false;

  const assignedIndex = findIndex(artistBudgets, (ab) => ab?.artist?.login === login);

  const previousArtists = artistBudgets.filter((item) => item?.artist?.id !== assignedTo?.id);

  if (!canViewAllArtistTabs) {
    if (assignedIndex !== -1) {
      const currentArtist = artistBudgets[assignedIndex];
      return (
        <div className='order_detail__box'>
          <div className='order_assigned_item'>
            <div className='d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center'>
                <strong className='title'>Assigned</strong>
              </div>
            </div>

            <div className='d-flex align-items-center justify-content-between'>
              <span className='mr-5'>Artist:</span>
              <strong className='name'>
                {isEmpty(currentArtist?.artist) ? '____________' : `${currentArtist?.artist?.fullName || ''}` || `${currentArtist?.artist?.firstName || ''} ${currentArtist?.artist?.lastName || ''}`}
              </strong>
            </div>
            <div className='d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center'>
                <span className=''>Budget:</span>
                <span className='icon d-block ml-1 mr-5'>
                  <InfoIC width='14px' height='14px' />
                </span>
              </div>
              <strong className='budget'>{formatMoney(currentArtist?.budget)} </strong>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
  return (
    <div className='order_detail__box'>
      <div className='order_assigned_item'>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <strong className='title'>Assigned</strong>
            {artistBudgets?.length > 1 && (
              <span className='icon d-block ml-1 mr-5'>
                <AssignedIcon width='14px' height='14px' />
              </span>
            )}
          </div>

          <CanShow permission={PERMITTIONS_CONFIG.ASSIGN_BOOKING}>
            <button className='box__control p-0' onClick={() => updateShowAssignedBoxAction(ASSIGNED_MODAL_KEYs.ASSIGNED)}>
              <span className='name'>Manage</span>
            </button>
          </CanShow>
        </div>

        <div className='d-flex align-items-center justify-content-between'>
          <span className='mr-5'>Current Artist:</span>
          <strong className='name'>
            {isEmpty(assignedTo) || assignedTo?.login === 'null' ? '____________' : `${assignedTo?.fullName || ''}` || `${assignedTo?.firstName || ''} ${assignedTo?.lastName || ''}`}
          </strong>
        </div>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <span className=''>Budget:</span>
            <span className='icon d-block ml-1 mr-5'>
              <InfoIC width='14px' height='14px' />
            </span>
          </div>
          <strong className='budget'>{formatMoney(order.budget)} </strong>
        </div>
      </div>
      <CanShow permission={PERMITTIONS_CONFIG.GET_ARTIST_BUDGET}>
        {previousArtists.map((item) => {
          return (
            <div className='mb-2 mt-2' key={`order__prev_artist__${item.id}`}>
              <PreviousArtistBudget item={item} />
            </div>
          );
        })}
      </CanShow>
    </div>
  );
};

const mapStateToProps = ({ auth, orderDetail }) => ({
  accountInfo: auth.data.accountInfo,
  order: orderDetail.data.order,
});

const mapDispatchToProps = {
  updateShowAssignedBoxAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignedItem);
