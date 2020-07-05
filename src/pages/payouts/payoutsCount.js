import React from 'react';
import { connect } from 'react-redux';

import { formatMoney } from 'utils';

const PayoutsCount = () => {
  return (
    <div className='payouts__count'>
      <div className='left'>
        <div className='name'>Paid:</div>
        <div className='number'>{formatMoney(1123)}</div>
        <div className='name'>Unpaid:</div>
        <div className='number'>{formatMoney(1123)}</div>
      </div>

      <div className='right'>
        <div className='name'>Total:</div>
        <div className='number'>{formatMoney(1121233)}</div>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsCount);
