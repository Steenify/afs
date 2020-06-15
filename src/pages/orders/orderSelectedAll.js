import React from 'react';
import { connect } from 'react-redux';
import { forEach } from 'lodash';

import { updateAllOrderSelectedAction } from './actions';

const OrderSelectedAll = ({ selected, updateAllOrderSelected }) => {
  const handleChange = (status) => {
    updateAllOrderSelected(status);
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

const mapStateToProps = ({ order }) => {
  let hasCheckedAll = true;
  const { orders } = order.list;

  forEach(orders, (or) => {
    if (!or.selected) {
      hasCheckedAll = false;
    }
  });

  return {
    selected: hasCheckedAll,
  };
};

const mapDispatchToProps = {
  updateAllOrderSelected: updateAllOrderSelectedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelectedAll);
