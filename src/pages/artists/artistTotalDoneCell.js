import React from 'react';
import { connect } from 'react-redux';

const ArtistTotalDoneCell = ({ totalDone }) => {
  return <div className='artist__totaldones artists__cell'>{totalDone}</div>;
};

const mapStateToProps = ({ artists }, ownProps) => {
  const { data } = ownProps;
  const { items } = artists.data;
  const item = items[data] || {};
  return {
    totalDone: item?.totalDone || 0,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistTotalDoneCell);
