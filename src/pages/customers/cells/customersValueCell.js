import React from 'react';
import { connect } from 'react-redux';

const CustomersValueCell = ({ totalSpent }) => {
  return <div className='customers__value'>{totalSpent && `$${totalSpent}`}</div>;
};

const mapStateToProps = ({ customers }, ownProps) => {
  const { data } = ownProps;
  const { items } = customers.list;
  const item = items[data] || {};
  return {
    totalSpent: item?.totalSpent || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersValueCell);
