import React from 'react';
import { connect } from 'react-redux';
import { updateCurrentItemAction } from '../action';

import Button from 'components/common/button';

const ActionCell = ({ item, updateCurrentItemAction }) => {
  const { sendDate } = item;
  const handleClick = (value) => {
    updateCurrentItemAction(item);
  };
  return sendDate ? null : (
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

const mapDispatchToProps = { updateCurrentItemAction };

export default connect(mapStateToProps, mapDispatchToProps)(ActionCell);
