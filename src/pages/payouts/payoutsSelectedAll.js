import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';

import { updateAllPayoutsSelectedAction } from './actions';

const PayoutsSelectedAll = ({ selected, updateAllPayoutsSelected }) => {
  const handleChange = (status) => {
    updateAllPayoutsSelected(status);
  };

  return (
    <label className='cus-checkbox'>
      <input
        className='form-control sr-only'
        type='checkbox'
        onChange={() => handleChange(!selected)}
        checked={selected}
      />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = ({ payouts }) => {
  const { items } = payouts.list;
  const selected = filter(items, (or) => or.selected).map((or) => or.id);

  return {
    selected: selected.length > 0,
  };
};

const mapDispatchToProps = {
  updateAllPayoutsSelected: updateAllPayoutsSelectedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsSelectedAll);
