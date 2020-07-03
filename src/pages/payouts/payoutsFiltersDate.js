import React, { useState } from 'react';
import { connect } from 'react-redux';

import DateRangePicker from 'components/common/datepicker/DateRangePicker';

import {} from './actions';

const OrderFilterDate = () => {
  return (
    <div>
      <DateRangePicker />
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilterDate);
