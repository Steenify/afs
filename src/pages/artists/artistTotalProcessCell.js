import React from 'react';
import { connect } from 'react-redux';

const ArtistTotalProcessCell = ({ totalInProgress }) => {
  return <div className='artist__processing'>{totalInProgress}</div>;
};

const mapStateToProps = ({ artists }, ownProps) => {
  const { data } = ownProps;
  const { items } = artists.data;
  const item = items[data] || {};
  return {
    totalInProgress: item?.totalInProgress || 0,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistTotalProcessCell);
