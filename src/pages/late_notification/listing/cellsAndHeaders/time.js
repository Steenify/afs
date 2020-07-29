import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
const TimeCell = ({ lastModifiedDate }) => {
  return <div>{lastModifiedDate}</div>;
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
  let lastModifiedDate = item?.lastModifiedDate;

  if (moment(lastModifiedDate || null).isValid()) {
    const date = moment(lastModifiedDate);
    if (moment().isSame(date, 'day')) {
      lastModifiedDate = date.format('hh:mm A');
    } else if (moment().add(-1, 'day').isSame(date, 'day')) {
      lastModifiedDate = `YesterDay at ${date.format('hh:mm A')}`;
    } else {
      lastModifiedDate = `${date.format('MMM DD')} at ${date.format('hh:mm A')}`;
    }
  }
  return {
    lastModifiedDate,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TimeCell);
