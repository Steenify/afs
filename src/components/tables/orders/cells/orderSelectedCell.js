import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { createSelector } from 'reselect';

import { updateOrderTableItemsAction } from 'components/tables/orders/actions';

const OrderSelectedCell = ({ selected, updateOrderTableItemsAction, id, reducer }) => {
  const handleChange = (checked) => {
    updateOrderTableItemsAction({
      payload: {
        id: id,
        field: 'selected',
        value: checked,
      },
      reducer,
    });
  };
  return (
    <label className='cus-checkbox'>
      <input className='form-control sr-only' type='checkbox' checked={selected} onChange={() => handleChange(!selected)} />
      <span className='checkmark'></span>
    </label>
  );
};

const idSelector = () => {
  return createSelector(
    (item) => item?.id || 0,
    (value) => value,
  );
};

const selectedSelector = () => {
  return createSelector(
    (item) => item?.selected || false,
    (value) => value,
  );
};

const mapStateToProps = () => {
  const getId = idSelector();
  const getSelected = selectedSelector();
  const mapStateToProps = (reducers, ownProps) => {
    const { data, reducer = 'orders' } = ownProps;
    const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
    return {
      id: getId(item),
      selected: getSelected(item),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = {
  updateOrderTableItemsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelectedCell);
