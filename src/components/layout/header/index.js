import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import { appToken } from 'vendor/firebase';

import { isMobile } from 'utils';

import { WEB_ROUTES } from 'configs';

import Notification from '../notification';
import AccountInfo from './AccountInfo';
import HeaderSearch from './headerSearch';

import './style.scss';

import { logOutAction } from 'pages/auth/actions';
import { changeLanguage, toggleMenu } from 'store/actions';

const Header = (props) => {
  const { className, accountInfo, toggleMenu, logOutAction, isMenuOpen } = props;

  const history = useHistory();
  useEffect(() => {
    toggleMenu(!isMobile());
  }, [toggleMenu]);

  const handleToggle = () => {
    props.toggleMenu(!isMenuOpen);
  };

  const handleSignOut = () => {
    logOutAction(
      {
        appToken,
      },
      () => {
        history.push(WEB_ROUTES.SIGN_IN.path);
      },
    );
  };

  return (
    <header className={`header__main ${className || ''}`}>
      <div className='container-fluid p-0 header__content'>
        <Navbar theme='light' className='align-items-stretch flex-md-nowrap p-0'>
          <Nav className='header__menu'>
            <button className='hamburger' onClick={handleToggle}>
              <span className='line'></span>
              <span className='line'></span>
              <span className='line'></span>
            </button>
            <HeaderSearch />
          </Nav>

          <Nav navbar className={`flex-row align-items-center header__nav ${isMenuOpen ? 'opening' : ''}`}>
            <Notification />
            <AccountInfo account={accountInfo} onSignout={handleSignOut} />
          </Nav>
        </Navbar>
      </div>
    </header>
  );
};

const mapStateToProps = ({ auth, global }) => ({
  accountInfo: auth.data.accountInfo,
  lang: global.data.lang,
  isMenuOpen: global.ui.isMenuOpen,
});

const mapDispatchToProps = {
  logOutAction,
  changeLanguage,
  toggleMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
