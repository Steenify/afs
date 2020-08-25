/* @flow */
import React from 'react';

import { ReactComponent as NSCavetRight } from 'assets/img/ns_cavet_right.svg';

export type Props = {
  // icon?: React$Node,

  title?: string,

  description?: string,

  active?: boolean,

  className?: string,
};

const MenuItem = (props: Props) => {
  const { title, description, active, className } = props;

  return (
    <div className={['d-flex', className && className].filter(Boolean).join(' ').trim()}>
      {/* <div className='mr-3 mt-2'>{icon}</div> */}

      <div className='d-flex align-items-center w-100'>
        <div>
          <h4 className='m-0 title'>{title}</h4>

          <p className='m-0 description'>{description}</p>
        </div>

        {active && (
          <div className='ml-auto'>
            <NSCavetRight />
          </div>
        )}
      </div>
    </div>
  );
};

MenuItem.propsType = {
  active: false,
};

export default MenuItem;
