import React from 'react';

const GalleryFilter = ({ onChange = () => {}, text = '' }) => {
  console.log('GalleryFilter -> text', text);
  return (
    <div className='gallery__filter'>
      <input
        type='text'
        placeholder='Search for order number, artist name, anime...'
        defaultValue={text}
        className='search__box form-control bg-white'
        onChange={(e) => onChange({ text: e.target.value })}
      />
    </div>
  );
};

export default GalleryFilter;
