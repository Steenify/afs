import React from 'react';
import { connect } from 'react-redux';

const CustomersOrderCell = ({ totalOrder }) => {
  return <div className='customers__order'>{totalOrder}</div>;
};

const mapStateToProps = ({ customers }, ownProps) => {
  const { data } = ownProps;
  const { items } = customers.list;
  const item = items[data] || {};
  return {
    totalOrder: item?.totalOrder || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersOrderCell);
