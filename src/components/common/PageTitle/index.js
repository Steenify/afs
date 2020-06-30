import React from 'react';

const PageTitle = (props) => {
  const { title, children, className, onGoBack } = props;

  const classNames = [
    'h3',
    'text-gray-800',
    onGoBack ? 'cursor-pointer' : '',
    className ? className : '',
  ].join(' ');

  return (
    <div className='d-flex align-items-center page__title'>
      <h3 className={classNames} onClick={onGoBack}>
        {onGoBack && <i className='fas fa-chevron-left mr-2'></i>}
        <span className='font-weight-bold'>{title}</span>
      </h3>

      {children && children}
    </div>
  );
};

export default PageTitle;
