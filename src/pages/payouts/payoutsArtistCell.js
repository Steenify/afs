import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';

const PayoutsArtistCell = ({ artist }) => {
  return (
    <div className={`payouts__artist`}>
      <Button
        tag={Link}
        className='w-100 payouts__link justify-content-start p-0'
        style={{ minWidth: 'auto' }}
        to={`/artists/${artist?.login}`}
        color='link'>
        {`${artist?.firstName || ''} ${artist?.lastName || ''}`}
      </Button>
    </div>
  );
};

const mapStateToProps = ({ payouts }, ownProps) => {
  const { data } = ownProps;
  const { items } = payouts.list;
  const item = items[data] || {};

  return {
    artist: item?.artist || {},
    code: item?.code,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsArtistCell);
