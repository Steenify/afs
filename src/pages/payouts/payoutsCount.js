import React from 'react';
import { connect } from 'react-redux';

const PayoutsCount = () => {
  return (
    <div className='payouts__coCountunt'>
      <div className='left'>
        <div className='name'>Paid:</div>
        <div className='number'>$15448.00</div>
        <div className='name'>Unpaid:</div>
        <div className='number'>$3148.50</div>
      </div>

      <div className='right'>
        <div className='name'>Total:</div>
        <div className='number'>$20685.50</div>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsCount);
