import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Button from 'components/common/button';
import { Link, useHistory } from 'react-router-dom';
import {
  faSignOutAlt,
  faUserAlt,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { WEB_ROUTES } from 'config';

import './style.scss';

const AccountInfo = (props) => {
  const { className, account, onSignout } = props;
  const { imageUrl, firstName, lastName, email } = account;
  const [dropdownOpen, setOpen] = useState(false);
  const history = useHistory();

  const toggle = () => setOpen(!dropdownOpen);

  const handleLogout = () => {
    history.push(WEB_ROUTES.SIGN_IN.path);
    onSignout();
  };

  return (
    <ButtonDropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      className={`account-info mx-2 ${className || ''}`}>
      <DropdownToggle>
        <div className='d-flex align-items-center'>
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
        </div>
      </DropdownToggle>
      <DropdownMenu>
        <Button className='link d-block w-100 text-left'>
          <FontAwesomeIcon className='mr-1' icon={faUserAlt} />
          Profile
        </Button>
        <Button
          className='link d-block w-100 text-left'
          tag={Link}
          to='/change-password'>
          <FontAwesomeIcon className='mr-1' icon={faKey} />
          Change Pasword
        </Button>
        <Button className='link d-block w-100 text-left' onClick={handleLogout}>
          <FontAwesomeIcon className='mr-1' icon={faSignOutAlt} />
          Signout
        </Button>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default AccountInfo;
