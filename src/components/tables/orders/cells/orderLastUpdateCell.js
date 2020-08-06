import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { dateTimeToDeadline } from 'utils';

import { ReactComponent as RedAlert } from 'assets/img/red__alert.svg';

const MapAlert = {
  NO_ASSIGNEE: 'This order need to assign to someone, follow up?',
  NO_ACTIVITY: 'Over 1 day no activity, follow up?',
  LATE_WORK_LOG_DEADLINE: 'No activity, follow up?',
  LATE_FINAL_DEADLINE: 'Late deadline. Follow up?',
};

const OrderLastUpdateDateCell = ({ lastModifiedDate, goToDetail, code, alert, status }) => {
  const alertType = alert?.type || '';
  const message = MapAlert[alertType];
  const isShowAlert = status !== 'DONE' && message;

  return (
    <div onClick={() => goToDetail(code)} className={`order__created_date`}>
      <div className=''>
        {dateTimeToDeadline(lastModifiedDate)}
        {isShowAlert ? (
          <span className='d-inline-block ml-2'>
            <RedAlert />
          </span>
        ) : null}
      </div>
      {isShowAlert && <div className='text-danger'> {message}</div>}
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
    alert: item?.alert,
    status: item?.status,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderLastUpdateDateCell);
