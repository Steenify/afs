import React from 'react';
import { connect } from 'react-redux';

import { mapStatusPayment, statusPayments } from 'config';

const OrderPaymentCell = ({ artistPaymentStatus, goToDetail, code }) => {
  return (
    <div
      onClick={() => goToDetail(code)}
      className={`order__status ${artistPaymentStatus || statusPayments[1]}`}>
      {mapStatusPayment[artistPaymentStatus] || mapStatusPayment.UNPAID}
    </div>
  );
};

const mapStateToProps = ({ order }, ownProps) => {
  const { original } = ownProps.row;
  const { items } = order.list;
  const item = items[original] || {};
  return {
    code: item?.code,
    artistPaymentStatus: item?.artistPaymentStatus || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentCell);
