import React from 'react';
import { connect } from 'react-redux';
import { setCurrentItemAction } from '../action';

import Button from 'components/common/button';
import CanShow from 'components/layout/canshow';
import { PERMITTIONS_CONFIG } from 'configs';

const ActionCell = ({ item, setCurrentItemAction }) => {
  const { sentDate } = item;
  const handleClick = (value) => {
    setCurrentItemAction(item);
  };
  return sentDate || !item?.lateBookings?.length ? null : (
    <CanShow permission={PERMITTIONS_CONFIG.NOTIFY_LATE_BOOKING_TO_CUSTOMER}>
      <Button className='btn-create ml-auto pl-4 pr-4' color='primary' onClick={handleClick}>
        Send Notification
      </Button>
    </CanShow>
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
