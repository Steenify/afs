import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { get } from 'lodash';

// import { updateAllOrderSelectedAction } from 'pages/orders/actions';

const OrderSelectedAll = ({ selected, updateAllOrderSelected }) => {
  const handleChange = (status) => {
    updateAllOrderSelected(status);
  };

  return (
    <label className='cus-checkbox'>
      <input className='form-control sr-only' type='checkbox' onChange={() => handleChange(!selected)} checked={selected} />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { reducerPath = 'order' } = ownProps;
  const reducer = get(reducers, reducerPath) || {};
  const items = get(reducer, 'table.items');
  const selected = filter(items, (or) => or.selected).map((or) => or.id);

  return {
    selected: selected.length > 0,
  };
};

// const mapStateToProps = ({ order }) => {
//   const { items } = order.list;
//   const selected = filter(items, (or) => or.selected).map((or) => or.id);

//   return {
//     selected: selected.length > 0,
//   };
// };

const mapDispatchToProps = {
  // updateAllOrderSelected: updateAllOrderSelectedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelectedAll);
