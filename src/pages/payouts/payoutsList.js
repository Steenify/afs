import React, { Component } from 'react';
import { connect } from 'react-redux';

import {} from './actions';

class Payouts extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className='payouts__page'>
        <div className='payouts__header box'>
          <div className='payouts__count'>
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

          <div className='payouts__filters'>
            <div className='filter__text'>
              <input
                type='text'
                className='form-control search_box'
                placeholder='Search for artist or order number...'
              />
            </div>

            <div className='filter__toggle'></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Payouts);
