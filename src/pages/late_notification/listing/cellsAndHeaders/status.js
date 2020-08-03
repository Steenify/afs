import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { dateFormatString, timeFormatString } from 'utils';
const StatusCell = ({ sentDate }) => {
  return <div>{sentDate}</div>;
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
  let sentDate = item?.sentDate || 'Not send';

  if (moment(sentDate || null).isValid()) {
    sentDate = `Sent at ${moment(sentDate).format(`${timeFormatString} ${dateFormatString}`)}`;
  }
  return {
    sentDate,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StatusCell);
