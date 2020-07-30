import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { getSelectedStatus } from 'utils';

const OrderStatusCell = ({ status, statuses, goToDetail, code }) => {
  return (
    <div onClick={() => goToDetail(code)} className={`order__status ${getSelectedStatus(status, statuses).name}`}>
      {getSelectedStatus(status, statuses).friendlyName}
    </div>
  );
};
const mapStateToProps = (reducers, ownProps) => {
  const { data, reducerPath = 'order' } = ownProps;
  const reducer = get(reducers, reducerPath) || {};
  const item = get(reducer, 'table.items')?.[data] || {};
  return {
    status: item?.status || '',
    code: item?.code || '',
    statuses: get(reducer, 'status'),
  };
};

// const mapStateToProps = ({ order }, ownProps) => {
//   const { data } = ownProps;
//   const { items } = order.list;
//   const item = items[data] || {};
//   return {
//     status: item?.status || '',
//     code: item?.code || '',
//     statuses: order.status,
//   };
// };

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatusCell);
