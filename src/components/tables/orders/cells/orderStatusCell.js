import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { getSelectedStatus } from 'utils';

const OrderStatusCell = ({ status, statusForCanvas, statuses, goToDetail, code }) => {
  return (
    <>
      <div onClick={() => goToDetail(code)} className={`order__status cursor-pointer ${getSelectedStatus(status, statuses).name}`}>
        {getSelectedStatus(status, statuses).friendlyName}
      </div>
      {statusForCanvas && (
        <div onClick={() => goToDetail(code)} className={`order__status cursor-pointer ${getSelectedStatus(statusForCanvas, statuses).name}`}>
          {getSelectedStatus(statusForCanvas, statuses).friendlyName}
        </div>
      )}
    </>
  );
};
const mapStateToProps = (reducers, ownProps) => {
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  const statuses = get(reducers, `orderTable.${reducer}.status`) || [];
  return {
    status: item?.status || '',
    statusForCanvas: item?.statusForCanvas || '',
    code: item?.code || '',
    statuses,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatusCell);
