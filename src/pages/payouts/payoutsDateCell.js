import React from 'react';
import { connect } from 'react-redux';

import { dateTimeToDeadline } from 'utils';

const PayoutsDateCell = ({ createdDate }) => {
  return (
    <div className={`payouts__date`}>{dateTimeToDeadline(createdDate)}</div>
  );
};

const mapStateToProps = ({ payouts }, ownProps) => {
  const { data } = ownProps;
  const { items } = payouts.list;
  const item = items[data] || {};

  return {
    createdDate: item?.createdDate,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsDateCell);
