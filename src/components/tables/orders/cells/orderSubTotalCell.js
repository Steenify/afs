import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { formatNumber } from 'utils';

const OrderSubTotalCell = ({ subtotal, goToDetail, code }) => {
  return <div onClick={() => goToDetail(code)} className={`order__subtotal cursor-pointer`}>{`${formatNumber(subtotal)}$`}</div>;
};

const mapStateToProps = (reducers, ownProps) => {
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  return {
    code: item?.code,
    subtotal: item?.subtotal || 0,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSubTotalCell);
