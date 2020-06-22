import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'reactstrap';
// import i18next from 'i18next';
import { debounce } from 'lodash';

import Notification from '../notification';
import AccountInfo from './AccountInfo';

import './style.scss';

import { actSignout } from 'pages/auth/actions';
import { changeLanguage, toggleMenu } from 'store/actions';

const Header = (props) => {
  const { className, accountInfo, lang, toggleMenu } = props;

  const [isShowInfo, setIsShowInfo] = useState(false);

  // const changeLanguage = (lang) => {
  //   i18next.changeLanguage(lang);
  //   props.changeLanguage(lang);
  // };

  const handleToggle = () => {
    props.toggleMenu(!props.isMenuOpen);
    if (window.innerWidth >= 660) {
      setIsShowInfo(true);
      return;
    }

    if (!props.isMenuOpen) {
      setIsShowInfo(false);
      return;
    }
    setIsShowInfo(true);
  };

  useEffect(() => {
    const listener = debounce(() => {
      toggleMenu(!(window.innerWidth < 768));
    }, 300);

    listener();

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [toggleMenu]);

  return (
    <header className={`header__main ${className || ''}`}>
      <div className='container-fluid p-0'>
        <Navbar
          theme='light'
          className='align-items-stretch flex-md-nowrap p-0'>
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
              <AccountInfo account={accountInfo} onSignout={props.actSignout} />
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
  actSignout,
  changeLanguage,
  toggleMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
