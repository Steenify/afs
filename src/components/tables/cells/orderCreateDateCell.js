import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { dateTimeToDeadline } from 'utils';

const OrderCreatedDateCell = ({ paidAt, goToDetail, code }) => {
  return (
    <div onClick={() => goToDetail(code)} className={`order__created_date`}>
      {dateTimeToDeadline(paidAt)}
    </div>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { data, reducerPath = 'order' } = ownProps;
  const reducer = get(reducers, reducerPath) || {};
  const item = get(reducer, 'table.items')?.[data] || {};
  return {
    paidAt: item?.paidAt,
    code: item?.code,
  };
};

// const mapStateToProps = ({ order }, ownProps) => {
//   const { data } = ownProps;
//   const { items } = order.list;
//   const item = items[data] || {};

//   return {
//     paidAt: item?.paidAt,
//     code: item?.code,
//   };
// };

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreatedDateCell);
