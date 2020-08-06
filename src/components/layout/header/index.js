import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'reactstrap';
// import i18next from 'i18next';
import { debounce } from 'lodash';
import { useHistory } from 'react-router-dom';

import { appToken } from 'vendor/firebase';

import { isMobile } from 'utils';

import { WEB_ROUTES } from 'configs';

import Notification from '../notification';
import AccountInfo from './AccountInfo';

import './style.scss';

import { logOutAction } from 'pages/auth/actions';
import { changeLanguage, toggleMenu } from 'store/actions';

const Header = (props) => {
  const { className, accountInfo, lang, toggleMenu, logOutAction } = props;

  const [isShowInfo, setIsShowInfo] = useState(true);

  const history = useHistory();

  // const changeLanguage = (lang) => {
  //   i18next.changeLanguage(lang);
  //   props.changeLanguage(lang);
  // };

  useEffect(() => {
    const listener = debounce(() => {
      toggleMenu(!isMobile());
    }, 1000);

    listener();

    // window.addEventListener('resize', listener);

    // return () => {
    //   window.removeEventListener('resize', listener);
    // };
  }, [toggleMenu]);

  const handleToggle = () => {
    props.toggleMenu(!props.isMenuOpen);
    if (!isMobile()) {
      setIsShowInfo(true);
      return;
    }

    if (!props.isMenuOpen) {
      setIsShowInfo(false);
      return;
    }
    setIsShowInfo(true);
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
      <div className='container-fluid p-0'>
        <Navbar theme='light' className='align-items-stretch flex-md-nowrap p-0'>
          <Nav>
            <button className='hamburger' onClick={handleToggle}>
              <span className='line'></span>
              <span className='line'></span>
              <span className='line'></span>
            </button>
          </Nav>

          {isShowInfo && (
            <Nav navbar className='flex-row align-items-center'>
              {/* <div className='lang'>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`item ${lang == 'en' ? 'item--active' : ''}`}>
                  English
                </button>
                <button
                  onClick={() => changeLanguage('vi')}
                  className={`item ${lang == 'vi' ? 'item--active' : ''}`}>
                  Vietnamese
                </button>
              </div> */}

              <Notification />
              <AccountInfo account={accountInfo} onSignout={handleSignOut} />
            </Nav>
          )}
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
