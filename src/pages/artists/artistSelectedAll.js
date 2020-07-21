import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';

import { updateAllArtistSelectedAction } from './actions';

const ArtistSelectedAll = ({ selected, updateAllArtistSelected }) => {
  const handleChange = (status) => {
    updateAllArtistSelected(status);
  };

  return (
    <label className='cus-checkbox'>
      <input
        className='form-control sr-only'
        type='checkbox'
        onChange={() => handleChange(!selected)}
        checked={selected}
      />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = ({ artists }) => {
  const { items } = artists.data;
  const selected = filter(items, (ar) => ar.selected).map((ar) => ar.id);

  return {
    selected: selected.length > 0,
  };
};

const mapDispatchToProps = {
  updateAllArtistSelected: updateAllArtistSelectedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistSelectedAll);
