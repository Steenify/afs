import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';

const ArtistFullNameCell = ({ login, firstName, lastName, fullName }) => {
  return (
    <Button tag={Link} className='w-100 justify-content-start artists__name artists__cell pl-0' to={`/artists/${login}`} color='link'>
      {fullName || `${firstName} ${lastName}`}
    </Button>
  );
};

const mapStateToProps = ({ artists }, ownProps) => {
  const { data } = ownProps;
  const { items } = artists.data;
  const item = items[data] || {};
  return {
    login: item?.login || '',
    firstName: item?.firstName || '',
    lastName: item?.lastName || '',
    fullName: item?.fullName || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistFullNameCell);
