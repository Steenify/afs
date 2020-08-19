import React from 'react';

const GalleryFilter = ({ onChange = () => {}, text = '' }) => {
  return (
    <div className='gallery__filter'>
      <input type='text' placeholder='Naruto, Dragon Ball, ...' defaultValue={text} className='search__box form-control bg-white' onChange={(e) => onChange({ text: e.target.value })} />
    </div>
  );
};

export default GalleryFilter;
