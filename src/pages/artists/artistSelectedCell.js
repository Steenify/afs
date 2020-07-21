import React from 'react';
import { connect } from 'react-redux';

import { updateArtistItemsAction } from './actions';

const ArtistSelectedCell = ({ selected, updateArtistItems, id }) => {
  const handleChange = (checked) => {
    updateArtistItems({
      id: id,
      field: 'selected',
      value: checked,
    });
  };
  return (
    <label className='cus-checkbox'>
      <input
        className='form-control sr-only'
        type='checkbox'
        checked={selected}
        onChange={() => handleChange(!selected)}
      />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = ({ artists }, ownProps) => {
  const { data } = ownProps;
  const { items } = artists.data;
  const item = items[data] || {};
  return {
    id: item?.id || 0,
    selected: item?.selected || false,
  };
};

const mapDispatchToProps = {
  updateArtistItems: updateArtistItemsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistSelectedCell);
