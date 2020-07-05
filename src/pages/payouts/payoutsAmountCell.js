import React from 'react';
import { connect } from 'react-redux';

import { formatNumber } from 'utils';

const PayoutsAmountCell = ({ totalPaid, goToDetail, transactionId }) => {
  return (
    <div
      onClick={() => goToDetail(transactionId)}
      className={`payouts__subtotal`}>{`${formatNumber(totalPaid)}$`}</div>
  );
};

const mapStateToProps = ({ payouts }, ownProps) => {
  const { data } = ownProps;
  const { items } = payouts.list;
  const item = items[data] || {};
  return {
    transactionId: item?.transactionId,
    totalPaid: item?.totalPaid || 0,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsAmountCell);
