import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { dateTimeToDeadline } from 'utils';

const OrderCreatedDateCell = ({ paidAt, goToDetail, code }) => {
  return (
    <div onClick={() => goToDetail(code)} className={`order__created_date cursor-pointer`}>
      {dateTimeToDeadline(paidAt)}
    </div>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  return {
    paidAt: item?.paidAt,
    code: item?.code,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreatedDateCell);
