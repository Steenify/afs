import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';

import { updateAllCustomersSelectedAction } from '../actions';

const CustomersSelectedAll = ({ selected, updateAllCustomersSelectedAction }) => {
  const handleChange = (status) => {
    updateAllCustomersSelectedAction(status);
  };

  return (
    <label className='cus-checkbox'>
      <input className='form-control sr-only' type='checkbox' onChange={() => handleChange(!selected)} checked={selected} />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = ({ customers }) => {
  const { items } = customers.list;
  const selected = filter(items, (or) => or.selected).map((or) => or.id);

  return {
    selected: selected.length > 0,
  };
};

const mapDispatchToProps = {
  updateAllCustomersSelectedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersSelectedAll);
