import React from 'react';
import { connect } from 'react-redux';

import { updateOrderItemsAcion } from './actions';

const OrderSelectedCell = ({ selected, updateOrderItems, id }) => {
  const handleChange = (checked) => {
    updateOrderItems({
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

const mapStateToProps = ({ order, auth }, ownProps) => {
  const { data } = ownProps;
  const { items } = order.list;
  const item = items[data] || {};
  return {
    id: item?.id || 0,
    selected: item?.selected || false,
  };
};

const mapDispatchToProps = {
  updateOrderItems: updateOrderItemsAcion,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelectedCell);
