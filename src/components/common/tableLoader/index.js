import React from 'react';
import ContentLoader from 'react-content-loader';
import './style.scss';

const TableLoader = () => (
  <div className='tableloader'>
    <ContentLoader
      speed={1}
      width={'100%'}
      height={'100%'}
      viewBox='0 0 1080 300'
      backgroundColor='#bfbfbf'
      foregroundColor='#e8e8e8'>
      <rect x='0' y='20' rx='4' ry='4' width='200' height='50' />
      <rect x='220' y='20' rx='4' ry='4' width='200' height='50' />
      <rect x='440' y='20' rx='4' ry='4' width='200' height='50' />
      <rect x='660' y='20' rx='4' ry='4' width='200' height='50' />
      <rect x='880' y='20' rx='4' ry='4' width='200' height='50' />

      <rect x='0' y='90' rx='4' ry='4' width='200' height='50' />
      <rect x='220' y='90' rx='4' ry='4' width='200' height='50' />
      <rect x='440' y='90' rx='4' ry='4' width='200' height='50' />
      <rect x='660' y='90' rx='4' ry='4' width='200' height='50' />
      <rect x='880' y='90' rx='4' ry='4' width='200' height='50' />

      <rect x='0' y='160' rx='4' ry='4' width='200' height='50' />
      <rect x='220' y='160' rx='4' ry='4' width='200' height='50' />
      <rect x='440' y='160' rx='4' ry='4' width='200' height='50' />
      <rect x='660' y='160' rx='4' ry='4' width='200' height='50' />
      <rect x='880' y='160' rx='4' ry='4' width='200' height='50' />

      <rect x='0' y='160' rx='4' ry='4' width='200' height='50' />
      <rect x='220' y='160' rx='4' ry='4' width='200' height='50' />
      <rect x='440' y='160' rx='4' ry='4' width='200' height='50' />
      <rect x='660' y='160' rx='4' ry='4' width='200' height='50' />
      <rect x='880' y='160' rx='4' ry='4' width='200' height='50' />

      <rect x='0' y='230' rx='4' ry='4' width='200' height='50' />
      <rect x='220' y='230' rx='4' ry='4' width='200' height='50' />
      <rect x='440' y='230' rx='4' ry='4' width='200' height='50' />
      <rect x='660' y='230' rx='4' ry='4' width='200' height='50' />
      <rect x='880' y='230' rx='4' ry='4' width='200' height='50' />

      <rect x='0' y='300' rx='4' ry='4' width='200' height='50' />
      <rect x='220' y='300' rx='4' ry='4' width='200' height='50' />
      <rect x='440' y='300' rx='4' ry='4' width='200' height='50' />
      <rect x='660' y='300' rx='4' ry='4' width='200' height='50' />
      <rect x='880' y='300' rx='4' ry='4' width='200' height='50' />
    </ContentLoader>
  </div>
);

export default TableLoader;
