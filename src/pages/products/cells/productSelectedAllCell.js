import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';

import { updateAllProductSelectedAction } from '../actions';

const ProductSelectedAll = ({ selected, updateAllProductSelected }) => {
  const handleChange = (status) => {
    updateAllProductSelected(status);
  };

  return (
    <label className='cus-checkbox'>
      <input className='form-control sr-only' type='checkbox' onChange={() => handleChange(!selected)} checked={selected} />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = ({ products }) => {
  const { items } = products.data;
  const selected = filter(items, (ar) => ar.selected).map((ar) => ar.id);

  return {
    selected: selected.length > 0,
  };
};

const mapDispatchToProps = {
  updateAllProductSelected: updateAllProductSelectedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectedAll);
