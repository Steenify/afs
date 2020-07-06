import React from 'react';
import { connect } from 'react-redux';

import { formatNumber } from 'utils';

const PayoutsAmountCell = ({ totalPaid }) => {
  return (
    <div className={`payouts__subtotal`}>{`${formatNumber(totalPaid)}$`}</div>
  );
};

const mapStateToProps = ({ payouts }, ownProps) => {
  const { data } = ownProps;
  const { items } = payouts.list;
  const item = items[data] || {};
  return {
    totalPaid: item?.totalPaid || 0,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsAmountCell);
