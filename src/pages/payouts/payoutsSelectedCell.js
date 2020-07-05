import React from 'react';
import { connect } from 'react-redux';

import { updatePayoutsItemsAction } from './actions';

const PayoutSelectedCell = ({ selected, updatePayoutsItems, id }) => {
  const handleChange = (checked) => {
    updatePayoutsItems({
      id: id,
      field: 'selected',
      value: checked,
    });
  };
  return (
    <label className='cus-checkbox'>
      <input
        className='form-control sr-only'
        type='checkbox'
        checked={selected}
        onChange={() => handleChange(!selected)}
      />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = ({ payouts, auth }, ownProps) => {
  const { data } = ownProps;
  const { items } = payouts.list;
  const item = items[data] || {};
  return {
    id: item?.id || 0,
    selected: item?.selected || false,
  };
};

const mapDispatchToProps = {
  updatePayoutsItems: updatePayoutsItemsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutSelectedCell);
