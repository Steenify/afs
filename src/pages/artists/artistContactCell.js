import React from 'react';
import { connect } from 'react-redux';

const ArtistContactCell = ({ email, ig, phoneNumber, phonePrefix }) => {
  return (
    <div className='artist__contact'>
      {email && <div>Email: {email}</div>}
      {ig && <div>Instagram: {ig}</div>}
      {phoneNumber && (
        <div>
          Phone: {phonePrefix} {phoneNumber}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ artists }, ownProps) => {
  const { data } = ownProps;
  const { items } = artists.data;
  const item = items[data] || {};
  return {
    email: item?.email || '',
    ig: item?.ig || '',
    phoneNumber: item?.phoneNumber || '',
    phonePrefix: item?.phonePrefix || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistContactCell);
