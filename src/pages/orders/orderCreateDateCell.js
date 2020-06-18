import React from 'react';
import { connect } from 'react-redux';

import { dateTimeToDeadline } from 'utils';

const OrderCreatedDateCell = ({ paidAt, goToDetail, code }) => {
  return (
    <div onClick={() => goToDetail(code)} className={`order__created_date`}>
      {dateTimeToDeadline(paidAt)}
    </div>
  );
};

const mapStateToProps = ({ order }, ownProps) => {
  const { original } = ownProps.row;
  const { items } = order.list;
  const item = items[original] || {};

  return {
    paidAt: item?.paidAt,
    code: item?.code,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderCreatedDateCell);
