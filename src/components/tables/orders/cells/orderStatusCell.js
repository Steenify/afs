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
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  const statuses = get(reducers, `orderTable.${reducer}.status`) || [];
  return {
    status: item?.status || '',
    code: item?.code || '',
    statuses,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatusCell);
