import React from 'react';
import { connect } from 'react-redux';

const CustomersAddressCell = ({ city, country, province }) => {
  return (
    <div className={`customers__address`}>
      {city} {province && `, ${province}`} {country && `, ${country}`}
    </div>
  );
};

const mapStateToProps = ({ customers }, ownProps) => {
  const { data } = ownProps;
  const { items } = customers.list;
  const item = items[data] || {};

  return {
    city: item?.customerExtension?.city || '',
    country: item?.customerExtension?.country || '',
    province: item?.customerExtension?.province || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersAddressCell);
