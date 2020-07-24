import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';

const CustomersFullNameCell = ({ login, firstName, lastName, fullName }) => {
  return (
    <Button tag={Link} className='w-100 justify-content-start customers__name pl-0' to={`/customer/detail/${login}`} color='link'>
      {fullName || `${firstName} ${lastName}`}
    </Button>
  );
};

const mapStateToProps = ({ customers }, ownProps) => {
  const { data } = ownProps;
  const { items } = customers.list;
  const item = items[data] || {};
  return {
    login: item?.login || '',
    firstName: item?.firstName || '',
    lastName: item?.lastName || '',
    fullName: item?.fullName || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersFullNameCell);
