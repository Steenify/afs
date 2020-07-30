import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { formatNumber } from 'utils';

const OrderSubTotalCell = ({ subtotal, goToDetail, code }) => {
  return <div onClick={() => goToDetail(code)} className={`order__subtotal`}>{`${formatNumber(subtotal)}$`}</div>;
};

const mapStateToProps = (reducers, ownProps) => {
  const { data, reducerPath = 'order' } = ownProps;
  const reducer = get(reducers, reducerPath) || {};
  const item = get(reducer, 'table.items')?.[data] || {};
  return {
    code: item?.code,
    subtotal: item?.subtotal || 0,
  };
};

// const mapStateToProps = ({ order }, ownProps) => {
//   const { data } = ownProps;
//   const { items } = order.list;
//   const item = items[data] || {};
//   return {
//     code: item?.code,
//     subtotal: item?.subtotal || 0,
//   };
// };

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSubTotalCell);
