import React from 'react';
import { connect } from 'react-redux';

const UserFullNameCell = ({ firstName, lastName, fullName }) => {
  return <div>{fullName || `${firstName} ${lastName}`}</div>;
};

const mapStateToProps = ({ user }, ownProps) => {
  const { data } = ownProps;
  const { items } = user.list;
  const item = items[data] || {};
  return {
    firstName: item?.firstName || '',
    lastName: item?.lastName || '',
    fullName: item?.fullName || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserFullNameCell);
