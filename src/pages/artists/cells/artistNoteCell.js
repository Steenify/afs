import React from 'react';
import { connect } from 'react-redux';

const ArtistNoteCell = ({ note }) => {
  return <div className='artist__note artists__cell'>{note}</div>;
};

const mapStateToProps = ({ artists }, ownProps) => {
  const { data } = ownProps;
  const { items } = artists.data;
  const item = items[data] || {};
  return {
    note: item?.note || 'N/A',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistNoteCell);
