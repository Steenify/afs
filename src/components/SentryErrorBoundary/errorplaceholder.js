import React from 'react';

import { ReactComponent as Placeholder } from 'assets/img/Image_placeholder.svg';

const ErrorPlaceholder = (props) => {
  const { meassage } = props;
  return (
    <div className='error_placeholder'>
      <div className='error_placeholder__icon'>
        <Placeholder />
      </div>
      <div className='error_placeholder__text'>{meassage}</div>
    </div>
  );
};

ErrorPlaceholder.defaultProps = {
  meassage: 'Something went wrong. We are checking it!',
};

export default ErrorPlaceholder;
