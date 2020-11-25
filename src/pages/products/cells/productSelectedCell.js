import React from 'react';
import { connect } from 'react-redux';

import { updateProductItemsAction } from '../actions';

const ProductSelectedCell = ({ selected, updateProductItemsAction, id }) => {
  const handleChange = (checked) => {
    updateProductItemsAction({
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

const mapStateToProps = ({ products }, ownProps) => {
  const { data } = ownProps;
  const { items } = products.data;
  const item = items[data] || {};
  return {
    id: item?.id || 0,
    selected: item?.selected || false,
  };
};

const mapDispatchToProps = {
  updateProductItemsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectedCell);
