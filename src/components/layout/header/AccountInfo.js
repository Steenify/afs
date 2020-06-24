import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';

import { ReactComponent as Toggle } from 'assets/img/toggle.svg';
import { ReactComponent as Profile } from 'assets/img/profile.svg';
import { ReactComponent as Logout } from 'assets/img/logout.svg';
import { ReactComponent as Lock } from 'assets/img/lock.svg';

import './style.scss';

const AccountInfo = (props) => {
  const { className, account, onSignout } = props;
  const { imageUrl, firstName, lastName, email } = account;
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      className={`account-info mx-2 ${className || ''}`}>
      <DropdownToggle className='account-info__toggle'>
        <div className='account-info__title d-flex align-items-center'>
          <div className='avatar'>
            {imageUrl ? (
              <img src={imageUrl} alt={`${firstName}${lastName}`} />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${firstName}${lastName}`}
                alt={`${firstName}${lastName}`}
              />
            )}
          </div>
          <div className='info text-left pl-1 d-sm-block d-none'>
            <p className='name'>
              {firstName} {lastName}
            </p>
            <p className='email'>{email}</p>
          </div>
          <div className='icon d-sm-flex d-none'>
            <Toggle />
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu>
        <Button
          color='link'
          className='account-info__link d-block w-100 text-left'>
          <span className='icon'>
            <Profile />
          </span>
          <span className='text'>Profile</span>
        </Button>
        <Button
          color='link'
          className='account-info__link d-block w-100 text-left'
          tag={Link}
          to='/change-password'>
          <span className='icon'>
            <Lock />
          </span>
          <span className='text'>Change Pasword</span>
        </Button>
        <Button
          color='link'
          className='account-info__link d-block w-100 text-left'
          onClick={onSignout}>
          <span className='icon'>
            <Logout />
          </span>
          <span className='text'>Signout</span>
        </Button>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default AccountInfo;
