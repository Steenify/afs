import React from 'react';
import { connect } from 'react-redux';

const CustomersAddressCell = ({ city, country, province }) => {
  return <div className={`customers__address`}>{[city, province, country].filter((item) => item).join(', ')}</div>;
};

const mapStateToProps = ({ customers }, ownProps) => {
  const { data } = ownProps;
  const { items } = customers.list;
  const item = items[data] || {};

  return {
    city: item?.city || '',
    country: item?.country || '',
    province: item?.province || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersAddressCell);
