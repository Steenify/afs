import React from 'react';

const GalleryTags = ({ tags = [], currentTag = null, onClickTag = () => {}, disable }) => {
  if (disable) {
    return (
      <div className='tag_container mt-1'>
        {tags.map((tag, index) => (
          <div className='tag_item_small' key={`tag__item__small__${index}`} color='primary'>
            {tag}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className='tag_container'>
      {tags.map((tag, index) => (
        <button className={`tag_item ${currentTag === tag && 'active'}`} key={`tag__item__${index}`} color='primary' onClick={() => onClickTag({ tag: currentTag === tag ? null : tag })}>
          {tag}
        </button>
      ))}
    </div>
  );
};

export default GalleryTags;
