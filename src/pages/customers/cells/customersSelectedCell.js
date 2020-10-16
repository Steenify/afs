import React from 'react';
import { connect } from 'react-redux';

import { updateCustomersItemsAction } from '../actions';

const CustomersSelectedCell = ({ selected, updateCustomersItemsAction, id }) => {
  const handleChange = (checked) => {
    updateCustomersItemsAction({
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

const mapStateToProps = ({ customers }, ownProps) => {
  const { data } = ownProps;
  const { items } = customers.list;
  const item = items[data] || {};
  return {
    id: item?.id || 0,
    selected: item?.selected || false,
  };
};

const mapDispatchToProps = {
  updateCustomersItemsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersSelectedCell);
