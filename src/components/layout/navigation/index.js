import React from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrow-left.svg';

import './style.scss';

const Navigation = ({ title, RightButton }) => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className='navigation__page'>
      <div className='navigation__container'>
        <div className='navigation__left'>
          <button className='navigation__back' onClick={handleBack} type='button'>
            <span className='icon'>
              <ArrowLeftIcon />
            </span>
          </button>

          <div className='navigation__title'>{title}</div>
        </div>

        <div className='navigation__right'>
          <RightButton />
        </div>
      </div>
    </div>
  );
};

Navigation.defaultProps = {
  title: '',
  RightButton: () => null,
};

export default Navigation;
