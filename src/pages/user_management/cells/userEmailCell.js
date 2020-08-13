import React from 'react';
import { connect } from 'react-redux';

const UserEmailCell = ({ email }) => {
  return <div>{email}</div>;
};

const mapStateToProps = ({ user }, ownProps) => {
  const { data } = ownProps;
  const { items } = user.list;
  const item = items[data] || {};
  return {
    email: item?.email || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserEmailCell);
