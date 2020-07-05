import React from 'react';
import { connect } from 'react-redux';

import { dateTimeToDeadline } from 'utils';

const PayoutsDateCell = ({ createdDate, goToDetail, transactionId }) => {
  return (
    <div onClick={() => goToDetail(transactionId)} className={`payouts__date`}>
      {dateTimeToDeadline(createdDate)}
    </div>
  );
};

const mapStateToProps = ({ payouts }, ownProps) => {
  const { data } = ownProps;
  const { items } = payouts.list;
  const item = items[data] || {};

  return {
    createdDate: item?.createdDate,
    transactionId: item?.transactionId,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsDateCell);
