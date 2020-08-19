import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';
import { reduce, get } from 'lodash';

import { PERMITTIONS_CONFIG } from 'configs';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import { updateOrderTableFilterAction, getOrderTableCountByStatusAction } from './actions';
import { countTotalOrders } from 'utils';

const OrderFilterAssignee = ({ status, selectedStatus, orderStatusCount, accountInfo, updateOrderTableFilterAction, getOrderTableCountByStatusAction, reducer }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const handleChangeStatus = (event) => {
    const { target } = event;
    const status = target.getAttribute('data');
    updateOrderTableFilterAction({
      payload: {
        selectedStatus: status,
        page: 0,
      },
      reducer,
    });
  };
  const canShowPoster = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.SHOW_POSTER);
  const totalOrders = countTotalOrders(orderStatusCount);

  useEffect(() => {
    getOrderTableCountByStatusAction({ reducer });
  }, [getOrderTableCountByStatusAction, reducer]);

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      transitionDuration={0.000001}
      padding={10}
      onClickOutside={toggle}
      content={() => (
        <div className='order__filter inside_popover'>
          <div className='list_status'>
            <button data='' onClick={handleChangeStatus} key={`list__status_option__all`} className={`status ${!selectedStatus && 'active'}`}>
              All
              <span className='number'>{totalOrders || 0}</span>
            </button>
            {status.map((sta) =>
              sta.name.includes('PRINT_') && !canShowPoster ? (
                <></>
              ) : (
                <button data={sta.name} onClick={handleChangeStatus} key={`list__status_option__${sta.name}`} className={`status  ${sta.name} ${selectedStatus === sta.name && 'active'}`}>
                  {sta.friendlyName}
                  {orderStatusCount[sta.name] && sta.name !== 'DONE' && <span className='number'>{orderStatusCount[sta.name]}</span>}
                </button>
              ),
            )}
          </div>
        </div>
      )}>
      <button onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='filter__toggle middle'>
        <span className='dispaly_name'>{status.find((s) => s.name === selectedStatus)?.friendlyName || 'Status'}</span>
        <span className='icon mb-1 ml-2'>
          <Cavet />
        </span>
      </button>
    </Popover>
  );
};

const mapStateToProps = ({ orderTable, auth }, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const table = get(orderTable, `${reducer}`);
  return {
    accountInfo: auth.data.accountInfo,
    status: table.status,
    selectedStatus: table.filter.selectedStatus,
    orderStatusCount: table.orderStatusCount,
  };
};

const mapDispatchToProps = {
  updateOrderTableFilterAction,
  getOrderTableCountByStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilterAssignee);
