import React from 'react';

import { ReactComponent as Placeholder } from 'assets/img/Image_placeholder.svg';
import './style.scss';

const ErrorPlaceholder = (props) => {
  const { meassage } = props;
  return (
    <div className='error_placeholder'>
      <div className='error_placeholder__icon'>
        <Placeholder />
      </div>
      <div className='error_placeholder__text'>
        {meassage ||
          'There is something wrong, Please inform developer to checking it!'}
      </div>
    </div>
  );
};

ErrorPlaceholder.defaultProps = {
  meassage: 'Something went wrong. We are checking it!',
};

export default ErrorPlaceholder;
