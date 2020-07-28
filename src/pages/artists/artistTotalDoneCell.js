import React from 'react';
import { connect } from 'react-redux';

const ArtistTotalDoneCell = ({ numDone }) => {
  return <div className='artist__totaldones artists__cell'>{numDone}</div>;
};

const mapStateToProps = ({ artists }, ownProps) => {
  const { data } = ownProps;
  const { items } = artists.data;
  const item = items[data] || {};
  return {
    numDone: item?.numDone || 0,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistTotalDoneCell);
