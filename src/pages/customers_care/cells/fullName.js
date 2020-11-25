import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';

const FullNameCell = ({ login, firstName, lastName, fullName }) => {
  return (
    <Button tag={Link} disabled={!login} className='w-100 justify-content-start table__link customers__name pl-0' to={`/customer/detail/${login}`} color='link'>
      {fullName || `${firstName} ${lastName}`}
    </Button>
  );
};

const mapStateToProps = ({ customersCare }, ownProps) => {
  const { data } = ownProps;
  const { items } = customersCare.list;
  const item = items?.[data]?.customer || {};

  return {
    login: item?.login || '',
    firstName: item?.firstName || '',
    lastName: item?.lastName || '',
    fullName: item?.fullName || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FullNameCell);
