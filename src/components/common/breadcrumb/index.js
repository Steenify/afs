import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import { ReactComponent as ArrowLeft } from 'assets/img/chevonRight.svg';

import './style.scss';

const BreadcrumbMenu = (props) => {
  const history = useHistory();

  const handleClick = (item) => {
    if (item.path) {
      history.push(item.path);
    }
  };

  return (
    <div className='breadcrumb-menu'>
      <Breadcrumb>
        {props.data.map((item, index) => (
          <BreadcrumbItem
            onClick={() => handleClick(item)}
            key={`breadcrumb__item__${item.path + index}`}
            active={item.active}>
            {item?.isBack && (
              <span className='icon mr-2'>
                <ArrowLeft />
              </span>
            )}
            <span style={{ marginTop: '2px' }} className='text'>
              {item.title}
            </span>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbMenu;
