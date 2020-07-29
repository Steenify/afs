import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { dateFormatString, timeFormatString } from 'utils';
const StatusCell = ({ sendDate }) => {
  return <div>{sendDate}</div>;
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
  let sendDate = item?.sendDate || 'Not send';

  if (moment(sendDate || null).isValid()) {
    sendDate = `Sent at ${moment(sendDate).format(`${timeFormatString} ${dateFormatString}`)}`;
  }
  return {
    sendDate,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StatusCell);
