import React from 'react';
import { connect } from 'react-redux';

import { formatNumber } from 'utils';

const OrderSubTotalCell = ({ subtotal, goToDetail, code }) => {
  return (
    <div
      onClick={() => goToDetail(code)}
      className={`order__subtotal`}>{`${formatNumber(subtotal)}$`}</div>
  );
};

const mapStateToProps = ({ order }, ownProps) => {
  const { data } = ownProps;
  const { items } = order.list;
  const item = items[data] || {};
  return {
    code: item?.code,
    subtotal: item?.subtotal || 0,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSubTotalCell);
