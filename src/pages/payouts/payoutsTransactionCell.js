import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Button from 'components/common/button';

const PayoutsTransactionCell = ({ transactionId }) => {
  return (
    <div className={`payouts__transaction`}>
      <Button
        tag={Link}
        className='w-100 payouts__link justify-content-start p-0'
        style={{ minWidth: 'auto' }}
        to={`/payout/${transactionId}`}
        color='link'>
        {transactionId}
      </Button>
    </div>
  );
};

const mapStateToProps = ({ payouts }, ownProps) => {
  const { data } = ownProps;
  const { items } = payouts.list;
  const item = items[data] || {};

  return {
    transactionId: item?.transactionId,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PayoutsTransactionCell);
