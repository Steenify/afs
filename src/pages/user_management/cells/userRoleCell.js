import React from 'react';
import { connect } from 'react-redux';

const UserRoleCell = ({ authorities }) => {
  return <div>{authorities.join(',')}</div>;
};

const mapStateToProps = ({ user }, ownProps) => {
  const { data } = ownProps;
  const { items } = user.list;
  const item = items[data] || {};
  return {
    authorities: item?.authorities || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserRoleCell);
