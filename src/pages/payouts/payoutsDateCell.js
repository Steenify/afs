import React from 'react';
import { connect } from 'react-redux';

import { dateTimeToDeadline } from 'utils';

const PayoutsDateCell = ({ createdDate, goToDetail, code }) => {
  return (
    <div onClick={() => goToDetail(code)} className={`payouts__date`}>
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
    code: item?.code,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsDateCell);
