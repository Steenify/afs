import React from 'react';
import { connect } from 'react-redux';
import { dateStringFromDate } from 'utils';

const DateCell = ({ date }) => {
  return <div className={``}>{dateStringFromDate(date)}</div>;
};

const mapStateToProps = ({ customersCare }, ownProps) => {
  const { data } = ownProps;
  const { items } = customersCare.list;
  const item = items[data] || {};

  return {
    date: item?.date || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DateCell);
