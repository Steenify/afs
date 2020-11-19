import React, { useState } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';
import { get } from 'lodash';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import { updateOrderTableFilterAction, getOrderTableCountByStatusAction } from './actions';

const OrderFilterAssignee = ({ updateOrderTableFilterAction, reducer, tagItems, tags, orderStatusCount }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const handleChangeTag = (event) => {
    const { target } = event;
    const tags = target.getAttribute('data');
    updateOrderTableFilterAction({
      payload: {
        tags: tags ? [tags] : [],
        page: 0,
      },
      reducer,
    });
  };

  const totalCount = tagItems.reduce((total = 0, current) => {
    return (total += orderStatusCount[current.id] || 0);
  }, 0);

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
            <button data={null} onClick={handleChangeTag} key={`list__status_option__all`} className={`status ${!tags.length && 'active'}`}>
              All
              <span className='number'>{totalCount || 0}</span>
            </button>
            {tagItems.map(({ value = '', id = '' }) => (
              <button data={value} onClick={handleChangeTag} key={`list__productAction_option__${id}`} className={`status ${tags?.includes(value) && 'active'}`}>
                {value}
                {orderStatusCount[id] && <span className='number'>{orderStatusCount[id]}</span>}
              </button>
            ))}
          </div>
        </div>
      )}>
      <button onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='filter__toggle middle'>
        <span className='dispaly_name'>{tags[0] || 'Product'}</span>
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
    tagItems: table.tags,
    tags: table.filter.tags,
    orderStatusCount: table.orderStatusCount,
  };
};

const mapDispatchToProps = {
  updateOrderTableFilterAction,
  getOrderTableCountByStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilterAssignee);
