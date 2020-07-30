import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

// import { updateOrderItemsAcion } from 'pages/orders/actions';

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
      <input className='form-control sr-only' type='checkbox' checked={selected} onChange={() => handleChange(!selected)} />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { data, reducerPath = 'order' } = ownProps;
  const reducer = get(reducers, reducerPath) || {};
  const item = get(reducer, 'table.items')?.[data] || {};
  return {
    id: item?.id || 0,
    selected: item?.selected || false,
  };
};

// const mapStateToProps = ({ order }, ownProps) => {
//   const { data } = ownProps;
//   const { items } = order.list;
//   const item = items[data] || {};
//   return {
//     id: item?.id || 0,
//     selected: item?.selected || false,
//   };
// };

const mapDispatchToProps = {
  // updateOrderItems: updateOrderItemsAcion,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelectedCell);
