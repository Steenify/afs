import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getRemindersAction } from './actions';

import ReminderFilters from './reminderFilters';
import ReminderPaging from './reminderPaging';
import ReminderListTable from './reminderListTable';

const CustomerList = ({ getRemindersAction }) => {
  useEffect(() => {
    getRemindersAction();
  }, [getRemindersAction]);
  return (
    <div className='customers__page'>
      <div className='customers__header box'>{<ReminderFilters />}</div>
      <div className='customers__body'>{<ReminderListTable />}</div>
      <div className='customers__paging'>{<ReminderPaging />}</div>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { getRemindersAction })(CustomerList);
