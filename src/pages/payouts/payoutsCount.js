import React from 'react';
import { connect } from 'react-redux';

import { formatMoney } from 'utils';

const PayoutsCount = ({ summary }) => {
  return (
    <div className='payouts__count'>
      <div className='left'>
        <div className='name'>Paid:</div>
        <div className='number'>{formatMoney(summary?.bookingPaid)}</div>
        <div className='name'>Unpaid:</div>
        <div className='number'>{formatMoney(summary?.bookingUnPaid)}</div>
      </div>

      <div className='right'>
        <div className='name'>Total:</div>
        <div className='number'>{formatMoney(summary?.totalBudget)}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ payouts }) => ({
  summary: payouts.summary,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsCount);
