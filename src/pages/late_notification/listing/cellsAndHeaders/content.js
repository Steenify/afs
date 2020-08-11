import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setCurrentItemAction } from '../action';
import CanShow from 'components/layout/canshow';
import { PERMITTIONS_CONFIG } from 'configs';
const ContentCell = ({ isSend, setCurrentItemAction, item }) => {
  return (
    <CanShow permission={PERMITTIONS_CONFIG.VIEW_LATE_BOOKING_SENT_CONTENT}>
      {isSend ? (
        <div
          className='content sent_content'
          onClick={() => {
            item?.lateBookings?.length && setCurrentItemAction({ ...item, action: 'VIEW', currentViewId: item.lateBookings[0]?.id });
          }}>
          Sent Content
        </div>
      ) : (
        <div className='content'>N/A</div>
      )}
    </CanShow>
  );
};

const mapStateToProps = (
  {
    lateNotification: {
      listing: {
        data: { items },
      },
    },
  },
  ownProps,
) => {
  const { data } = ownProps;
  const item = items[data] || {};
  const sentDate = item?.sentDate || null;

  return {
    isSend: moment(sentDate).isValid(),
    item,
  };
};

const mapDispatchToProps = { setCurrentItemAction };

export default connect(mapStateToProps, mapDispatchToProps)(ContentCell);
