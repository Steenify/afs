import React from 'react';

import './style.scss';

const Navigation = ({ title, RightComponent }) => {
  return (
    <div className='navigation__page'>
      <div className='navigation__container'>
        <div className='navigation__left'>
          <button className='navigation__back' type='button'></button>

          <div className='navigation__title'>{title}</div>
        </div>

        <div className='navigation__right'>
          <RightComponent />
        </div>
      </div>
    </div>
  );
};

Navigation.defaultProps = {
  title: '',
  RightComponent: () => {},
};

export default Navigation;
