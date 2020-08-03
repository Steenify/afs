import React from 'react';
import { connect } from 'react-redux';
import { setCurrentItemAction } from '../action';

import Button from 'components/common/button';

const ActionCell = ({ item, setCurrentItemAction }) => {
  const { sentDate } = item;
  const handleClick = (value) => {
    setCurrentItemAction(item);
  };
  return sentDate || !item?.lateBookings?.length ? null : (
    <Button className='btn-create ml-auto pl-4 pr-4' color='primary' onClick={handleClick}>
      Send Notification
    </Button>
  );
};

const mapStateToProps = (
  {
    lateNotification: {
      listing: {
        data: { items },
      },
    },
  },
  ownProps,
) => {
  const { data } = ownProps;
  const item = items[data] || {};
  return {
    item,
  };
};

const mapDispatchToProps = { setCurrentItemAction };

export default connect(mapStateToProps, mapDispatchToProps)(ActionCell);
