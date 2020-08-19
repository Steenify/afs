import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const UserCreatedDateCell = ({ createdDate }) => {
  return <div>{createdDate && moment(createdDate).format('DD/MM/YYYY HH:mm')}</div>;
};

const mapStateToProps = ({ user }, ownProps) => {
  const { data } = ownProps;
  const { items } = user.list;
  const item = items[data] || {};
  return {
    createdDate: item?.createdDate || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreatedDateCell);
