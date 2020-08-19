import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';

const UserLoginCell = ({ login }) => {
  return (
    <Button tag={Link} className='w-100 justify-content-start user__name pl-0' to={`/user/detail/${login}`} color='link'>
      {login}
    </Button>
  );
};

const mapStateToProps = ({ user }, ownProps) => {
  const { data } = ownProps;
  const { items } = user.list;
  const item = items[data] || {};
  return {
    login: item?.login || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginCell);
