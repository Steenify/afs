import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import Sticky from 'react-stickynode';
import { toast } from 'react-toastify';

import SelectedAllCell from './headers/selection';
import { markAsRemindedAction } from './actions';
import { REMINDER_STATUS } from './const';

const ReminderBulkActions = (props) => {
  const { selected, markAsRemindedAction } = props;
  const isHide = !selected || !selected?.length;
  const createdList = selected.filter((item) => item?.type === REMINDER_STATUS.CREATED);

  const onMarkAsReminded = () => {
    const ids = createdList.map((item) => item?.id)?.filter((item) => item);
    const names = createdList.map((item) => item?.customer?.firstName || item?.item?.customer?.fullName || item?.customer?.lastName)?.filter((item) => item);
    markAsRemindedAction(ids, () => {
      toast.dark(`Reminders for [${names.join(', ')}] are marked as reminded`);
    });
  };

  return (
    <div className={`order__bulk`} style={{ opacity: isHide ? 0 : 1 }}>
      <Sticky innerClass='overflow-auto' top={57}>
        <div className='wrapper'>
          <div className='btn-group'>
            <div className='btn btn-group__item d-flex align-items-center '>
              <div className='d-flex align-items-center order__bulk__selected'>
                <SelectedAllCell />
                <span className='number'>{selected?.length} selected</span>
              </div>
            </div>

            {!!createdList?.length && (
              <button type='button' className='btn btn-group__item' onClick={onMarkAsReminded}>
                Mark as reminded
              </button>
            )}
          </div>
        </div>
      </Sticky>
    </div>
  );
};

const mapStateToProps = ({ customersCare, auth }) => {
  const { items } = customersCare.list;
  const selected = filter(items, (or) => or.selected) || [];
  return {
    accountInfo: auth.data.accountInfo,
    selected,
  };
};

const mapDispatchToProps = { markAsRemindedAction };

export default connect(mapStateToProps, mapDispatchToProps)(ReminderBulkActions);
