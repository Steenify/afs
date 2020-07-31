import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { get } from 'lodash';

import { updateOrderTableSelectAllAction } from 'components/tables/orders/actions';

const OrderSelectedAll = ({ selected, updateOrderTableSelectAllAction, reducer }) => {
  const handleChange = (status) => {
    updateOrderTableSelectAllAction({ payload: status, reducer });
  };

  return (
    <label className='cus-checkbox'>
      <input className='form-control sr-only' type='checkbox' onChange={() => handleChange(!selected)} checked={selected} />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const items = get(reducers, `orderTable.${reducer}.table.items`) || {};
  const selected = filter(items, (or) => or.selected).map((or) => or.id);

  return {
    selected: selected.length > 0,
  };
};

const mapDispatchToProps = {
  updateOrderTableSelectAllAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelectedAll);
