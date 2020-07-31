import React from 'react';
import { connect } from 'react-redux';

import CanShow from 'components/layout/canshow';

import { formatMoney } from 'utils';

import { PERMITTIONS_CONFIG } from 'config';

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
        <CanShow permission={PERMITTIONS_CONFIG.ASSIGN_BOOKING}>
          <div className='name'>Total:</div>
          <div className='number'>{formatMoney(summary?.totalBudget)}</div>
        </CanShow>
      </div>
    </div>
  );
};

const mapStateToProps = ({ payouts }) => ({
  summary: payouts.summary,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsCount);
