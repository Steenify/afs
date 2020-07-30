import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { mapStatusPayment, statusPayments } from 'config';

const OrderPaymentCell = ({ artistPaymentStatus, goToDetail, code }) => {
  return (
    <div onClick={() => goToDetail(code)} className={`order__status ${artistPaymentStatus || statusPayments[1]}`}>
      {mapStatusPayment[artistPaymentStatus] || mapStatusPayment.UNPAID}
    </div>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { data, reducerPath = 'order' } = ownProps;
  const reducer = get(reducers, reducerPath) || {};
  const item = get(reducer, 'table.items')?.[data] || {};
  return {
    code: item?.code,
    artistPaymentStatus: item?.artistPaymentStatus || '',
  };
};

// const mapStateToProps = ({ order }, ownProps) => {
//   const { data } = ownProps;
//   const { items } = order.list;
//   const item = items[data] || {};
//   return {
//     code: item?.code,
//     artistPaymentStatus: item?.artistPaymentStatus || '',
//   };
// };

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentCell);
