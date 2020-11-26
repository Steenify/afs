import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { ORDER_STATUS_FRIENDLY } from 'configs';
import { getSelectedStatus } from 'utils';

const OrderStatusCell = ({ overallStatus, goToDetail, code }) => {
  return (
    <>
      <div onClick={() => goToDetail(code)} className={`order__status cursor-pointer ${getSelectedStatus(overallStatus, ORDER_STATUS_FRIENDLY).name}`}>
        {getSelectedStatus(overallStatus, ORDER_STATUS_FRIENDLY).friendlyName}
      </div>
    </>
  );
};
const mapStateToProps = (reducers, ownProps) => {
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  return {
    overallStatus: item?.overallStatus || '',
    code: item?.code || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatusCell);
