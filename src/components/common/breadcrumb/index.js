import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import './style.scss';

const BreadcrumbMenu = (props) => {
  return (
    <div className='breadcrumb-menu'>
      <Breadcrumb>
        {props.data.map((item, index) => (
          <BreadcrumbItem key={item.path + index} active={item.active}>
            {item.title}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbMenu;
