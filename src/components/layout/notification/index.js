import React, { useState } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Badge,
} from 'reactstrap';
import { ReactComponent as Bell } from 'assets/img/bell.svg';

import './style.scss';

const Notification = (props) => {
  const { className } = props;
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      className={`notification ${className || ''}`}>
      <DropdownToggle>
        <div className='bell'>
          <div className='icon'>
            <Bell />
          </div>
          <Badge color='danger'>7</Badge>
        </div>
      </DropdownToggle>
      <DropdownMenu>
        <div className='dropdown-header d-flex justify-content-between'>
          <div>Notifications</div>
          <div>Mark all as read</div>
        </div>
        <div className='dropdown-body'>
          <div className='noti'>
            <div className='noti__icon'>
              <div className='icon bg-primary'>
                <div className='icon'>
                  <Bell />
                </div>
              </div>
            </div>
            <div className='noti__content'>
              <p className='noti__date'>December 7, 2019</p>
              <p className='noti__title'>Message</p>
              <p className='noti__desc'>
                Lorem ipsum dolor sit amet, consetur adipiscing elit. Lorem
                ipsum dolor sit.
              </p>
            </div>
          </div>
        </div>
        <div className='dropdown-footer'>
          <a className='link' href='/' title='See All'>
            See All
          </a>
        </div>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default Notification;
