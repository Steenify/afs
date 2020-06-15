import React from 'react';

const Loading = ({ className }) => {
  return (
    <div className={`loading__icon ${className || ''}`}>
      <div className='lds-ripple'>
        <div />
        <div />
      </div>
    </div>
  );
};
export default Loading;
