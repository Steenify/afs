import React, { useState } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';
import { get } from 'lodash';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import ListTags from 'components/layout/ListTags';

import { updateOrderTableFilterAction, getOrderTableCountByStatusAction } from './actions';

const OrderFilterAssignee = ({ updateOrderTableFilterAction, reducer, tagItems, tags, orderStatusCount }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const handleChangeTag = (tags) => {
    toggle();
    updateOrderTableFilterAction({
      payload: {
        tags: tags ? [tags] : [],
        page: 0,
      },
      reducer,
    });
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      transitionDuration={0.000001}
      padding={10}
      onClickOutside={toggle}
      content={() => <ListTags tagItems={tagItems} tags={tags} orderStatusCount={orderStatusCount} onSave={handleChangeTag} />}>
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
