import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';

import { selectAllReminderAction } from '../actions';

const SelectHeader = ({ selected, selectAllReminderAction }) => {
  const handleChange = (status) => {
    selectAllReminderAction(status);
  };

  return (
    <label className='cus-checkbox'>
      <input className='form-control sr-only' type='checkbox' onChange={() => handleChange(!selected)} checked={selected} />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = ({ customersCare }) => {
  const { items } = customersCare.list;
  const selected = filter(items, (item) => item.selected).map((or) => or.id);

  return {
    selected: selected.length > 0,
  };
};

const mapDispatchToProps = {
  selectAllReminderAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectHeader);
