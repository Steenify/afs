import React from 'react';
import { connect } from 'react-redux';
import { REMINDER_TYPES_TEXT } from '../const';

const TypeCell = ({ type }) => {
  return <div className={``}>{REMINDER_TYPES_TEXT[type] || ''}</div>;
};

const mapStateToProps = ({ customersCare }, ownProps) => {
  const { data } = ownProps;
  const { items } = customersCare.list;
  const item = items[data] || {};

  return {
    type: item?.type || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TypeCell);
