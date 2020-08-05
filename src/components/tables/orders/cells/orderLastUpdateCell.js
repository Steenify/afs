import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { dateTimeToDeadline } from 'utils';

const OrderLastUpdateDateCell = ({ lastModifiedDate, lastModifiedBy, goToDetail, code }) => {
  return (
    <div onClick={() => goToDetail(code)} className={`order__created_date`}>
      {dateTimeToDeadline(lastModifiedDate)}
    </div>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  return {
    lastModifiedBy: item?.lastModifiedBy,
    lastModifiedDate: item?.lastModifiedDate,
    code: item?.code,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderLastUpdateDateCell);
