import React from 'react';
import { connect } from 'react-redux';

import { dateTimeToDeadline } from 'utils';

const OrderDeadlineCell = ({ deadline, goToDetail, code }) => {
  return (
    <div onClick={() => goToDetail(code)} className={`order__deadline`}>
      {dateTimeToDeadline(deadline)}
    </div>
  );
};

const mapStateToProps = ({ order }, ownProps) => {
  const { original } = ownProps.row;
  const { items } = order.list;
  const item = items[original] || {};
  return {
    code: item?.code,
    deadline: item?.deadline,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDeadlineCell);
