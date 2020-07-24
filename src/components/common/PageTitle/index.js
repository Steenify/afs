import React from 'react';
import { ReactComponent as ArrowLeft } from 'assets/img/chevonRight.svg';

const PageTitle = (props) => {
  const { title, children, className, onGoBack } = props;

  const classNames = [
    'h3',
    'text-gray-800',
    onGoBack ? 'cursor-pointer' : '',
    className ? className : '',
  ].join(' ');

  return (
    <div className='d-flex align-items-center page__title justify-content-between'>
      <h3 className={classNames} onClick={onGoBack}>
        {onGoBack && (
          <span className='icon mr-2'>
            <ArrowLeft />
          </span>
        )}
        <span className='font-weight-bold'>{title}</span>
      </h3>

      {children && children}
    </div>
  );
};

export default PageTitle;
