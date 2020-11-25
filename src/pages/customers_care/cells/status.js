import React from 'react';
import { connect } from 'react-redux';
import { REMINDER_STATUS } from '../const';
import { markAsRemindedAction } from '../actions';
import { toast } from 'react-toastify';

import Button from 'components/common/button';
const StatusCell = ({ status, data, name, markAsRemindedAction }) => {
  const { REMINDED } = REMINDER_STATUS;
  const onMarkAsReminded = () => {
    if (data) {
      markAsRemindedAction([data], () => {
        toast.dark(`Reminder for [${name}] is marked as reminded`);
      });
    }
  };
  return status === REMINDED ? (
    <div className={``}>Reminded</div>
  ) : (
    <Button onClick={onMarkAsReminded} className='w-100 justify-content-start table__link customers__name pl-0' color='link'>
      Mark as reminded
    </Button>
  );
};

const mapStateToProps = ({ customersCare }, ownProps) => {
  const { data } = ownProps;
  const { items } = customersCare.list;
  const item = items[data] || {};

  return {
    status: item?.status || '',
    name: item?.customer?.firstName || item?.item?.customer?.fullName || item?.customer?.lastName || '',
  };
};

const mapDispatchToProps = {
  markAsRemindedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusCell);
