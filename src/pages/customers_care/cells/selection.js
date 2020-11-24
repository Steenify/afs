import React from 'react';
import { connect } from 'react-redux';

import { updateReminderItemsAction } from '../actions';

const SelectCell = ({ selected, updateReminderItemsAction, id }) => {
  const handleChange = (checked) => {
    updateReminderItemsAction({
      id: id,
      field: 'selected',
      value: checked,
    });
  };
  return (
    <label className='cus-checkbox'>
      <input className='form-control sr-only' type='checkbox' checked={selected} onChange={() => handleChange(!selected)} />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = ({ customersCare }, ownProps) => {
  const { data } = ownProps;
  const { items } = customersCare.list;
  const item = items[data] || {};
  return {
    id: item?.id || 0,
    selected: item?.selected || false,
  };
};

const mapDispatchToProps = {
  updateReminderItemsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCell);
