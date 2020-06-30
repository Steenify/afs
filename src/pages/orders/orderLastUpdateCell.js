import React from 'react';
import { connect } from 'react-redux';

import { dateTimeToDeadline } from 'utils';

const OrderLastUpdateDateCell = ({
  lastModifiedDate,
  lastModifiedBy,
  goToDetail,
  code,
}) => {
  return (
    <div onClick={() => goToDetail(code)} className={`order__created_date`}>
      {dateTimeToDeadline(lastModifiedDate)}
    </div>
  );
};

const mapStateToProps = ({ order }, ownProps) => {
  const { data } = ownProps;
  const { items } = order.list;
  const item = items[data] || {};

  return {
    lastModifiedBy: item?.lastModifiedBy,
    lastModifiedDate: item?.lastModifiedDate,
    code: item?.code,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderLastUpdateDateCell);
