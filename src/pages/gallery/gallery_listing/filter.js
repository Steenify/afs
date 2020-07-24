import React from 'react';

const GalleryFilter = ({ onChange = () => {} }) => {
  return (
    <div className='gallery__filter'>
      <input type='text' placeholder='Search for order number, artist name, anime...' className='search__box form-control bg-white' onChange={(e) => onChange({ text: e.target.value })} />
    </div>
  );
};

export default GalleryFilter;
