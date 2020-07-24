import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { reduce } from 'lodash';

import { PERMITTIONS_CONFIG } from 'config';

import './style.scss';

import { ReactComponent as Logo } from 'assets/img/logo.svg';
import { ReactComponent as UserIcon } from 'assets/img/user.svg';
// import { ReactComponent as Mensenger } from 'assets/img/Mensenger.svg';
import { ReactComponent as POS } from 'assets/img/pos.svg';
// import { ReactComponent as CustomerIcon } from 'assets/img/customer.svg';
import { ReactComponent as Artist } from 'assets/img/Artist.svg';
import { ReactComponent as Settings } from 'assets/img/settings.svg';
import { ReactComponent as Payouts } from 'assets/img/payouts.svg';
import { ReactComponent as Package } from 'assets/img/gallery.svg';

import { WEB_ROUTES } from 'config';

import { toggleMenu } from 'store/actions';

import { isMobile } from 'utils';

const SideBar = (props) => {
  const { t } = useTranslation();

  const { accountInfo, orderStatus, toggleMenuAction } = props;
  const { permissions } = accountInfo;

  const canSetting =
    permissions?.includes(PERMITTIONS_CONFIG.ACCESS_SETTING) || false;

  const totalOrders = reduce(
    orderStatus,
    (res, value, key) => {
      if (key !== 'DONE') {
        return (res += value);
      }
      return res;
    },
    0,
  );

  const handleClickNav = () => {
    toggleMenuAction(!isMobile());
  };

  const menus = [
    {
      group: 'Main',
      links: [
        {
          ...WEB_ROUTES.ORDERS,
          title: (
            <div className='order'>
              <span className='name'>{WEB_ROUTES.ORDERS.title}</span>{' '}
              <span className='number'>{totalOrders}</span>
            </div>
          ),
          icon: <POS />,
        },
        {
          ...WEB_ROUTES.PAYOUTS,
          title: WEB_ROUTES.PAYOUTS.title,
          icon: <Payouts />,
        },
        {
          ...WEB_ROUTES.USER_LIST,
          title: WEB_ROUTES.USER_LIST.title,
          icon: <UserIcon />,
        },

        {
          ...WEB_ROUTES.ARTISTS,
          icon: <Artist />,
        },
        {
          ...WEB_ROUTES.GALLERY_LISTING,
          icon: <Package />,
        },
        // {
        //   ...WEB_ROUTES.CUSTOMER_LIST,
        //   title: t(WEB_ROUTES.CUSTOMER_LIST.title),
        //   icon: <CustomerIcon />,
        // },

        // {
        //   ...WEB_ROUTES.CUSTOMER_GROUP_LIST,
        //   title: t(WEB_ROUTES.CUSTOMER_GROUP_LIST.title),
        //   icon: <GroupIcon />,
        // },
      ],
    },
    // {
    //   group: 'SALES CHANNELS',
    //   links: [
    //     {
    //       isExternal: true,
    //       icon: <Mensenger />,
    //       path: 'https://www.facebook.com/tnartoperation/inbox/',
    //       title: 'Messenger',
    //     },
    //   ],
    // },
  ];

  return (
    <div className={`sidebar ${props.isMenuOpen ? 'open' : ''}`}>
      <div className='sidebar__menu'>
        <NavLink exact={true} to='/' style={{ color: '#ffffff' }}>
          <Logo className='logo' width='60px' height='60px' />
        </NavLink>

        {menus.map((item) => (
          <div key={item.group} className='sidebar__group'>
            {item.group && item.group !== 'Main' && (
              <div className='sidebar__heading'>{item.group}</div>
            )}
            <ul className='sidebar__links'>
              <li className='item'>
                {item.links.map((link) => {
                  if (link.isExternal) {
                    return (
                      <a
                        key={link.path}
                        className='link link--icon'
                        href={link.path}
                        target='_blank'
                        rel='noreferrer'>
                        <span className='icon'>{link.icon}</span>
                        <span className='text'>{link.title}</span>
                      </a>
                    );
                  }
                  if (
                    !link.permission ||
                    (link.permission &&
                      permissions &&
                      permissions.indexOf(link.permission) !== -1)
                  ) {
                    return (
                      <NavLink
                        exact={true}
                        onClick={handleClickNav}
                        to={link.path}
                        className={`link ${link.icon ? 'link--icon' : ''}`}
                        key={link.path}>
                        <span className='icon'>{link.icon}</span>
                        <span className='text'>{link.title}</span>
                      </NavLink>
                    );
                  }
                  return null;
                })}
              </li>
            </ul>
          </div>
        ))}

        {canSetting && (
          <div className='sidebar__settings'>
            <NavLink
              exact={true}
              to={WEB_ROUTES.SETTINGS.path}
              className='link link--icon'>
              <span className='icon'>
                <Settings />
              </span>
              <span className='text'>{WEB_ROUTES.SETTINGS.title}</span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, global, order }) => {
  return {
    accountInfo: auth.data.accountInfo,
    isMenuOpen: global.ui.isMenuOpen,
    orderStatus: order.orderStatusCount,
  };
};

const mapDispatchToProps = {
  toggleMenuAction: toggleMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
