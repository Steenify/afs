import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';

import { WEB_ROUTES } from 'configs';

import { ReactComponent as Settings } from 'assets/img/settings.svg';
import { ReactComponent as Package } from 'assets/img/gallery.svg';
import { ReactComponent as LateNotificationIcon } from 'assets/img/late_notification.svg';

import './style.scss';

const SettingsPage = (props) => {
  const { t } = useTranslation();
  const { accountInfo, history } = props;
  const { permissions } = accountInfo;

  const SettingsList = [
    {
      ...WEB_ROUTES.USER_ROLE,
      title: t(WEB_ROUTES.USER_ROLE.title),
      icon: <Settings />,
      des: 'View and update user role',
    },
    {
      ...WEB_ROUTES.USER_PERMISSION,
      title: t(WEB_ROUTES.USER_PERMISSION.title),
      icon: <Settings />,
      des: 'View and update user permission',
    },
    {
      ...WEB_ROUTES.SYSTEM_PROPERTY_LIST,
      title: t(WEB_ROUTES.SYSTEM_PROPERTY_LIST.title),
      icon: <Settings />,
      des: 'View and update system property',
    },
    // {
    //   ...WEB_ROUTES.ARTISTS,
    //   icon: <Artist />,
    //   des: 'Manage Artist',
    // },

    {
      ...WEB_ROUTES.WORKFLOWS,
      icon: <Package />,
      des: 'Workflows',
    },
    {
      ...WEB_ROUTES.UI_COMPONENTS,
      icon: <Package />,
      des: 'UI Components',
    },
    {
      ...WEB_ROUTES.PRODUCTS,
      icon: <Package />,
      des: 'Products',
    },
    {
      ...WEB_ROUTES.LATE_NOTIFICATION,
      // title: t(WEB_ROUTES.CUSTOMER_LIST.title),
      icon: <LateNotificationIcon />,
      des: 'Late Notification',
    },
    {
      ...WEB_ROUTES.NOTIFICATION_SETTINGS,
      // title: t(WEB_ROUTES.CUSTOMER_LIST.title),
      icon: <LateNotificationIcon />,
      des: 'Notification Settings',
    },
  ];

  const handleNavigate = (item) => {
    history.push(item.path);
  };
  return (
    <Layout documentTitle={WEB_ROUTES.SETTINGS.title} container fluid>
      <div className='settings__page'>
        <PageTitle title={WEB_ROUTES.SETTINGS.title} className='mb-0 mr-3' />
        <div className='settings__content box'>
          <div className='row'>
            {SettingsList.map((set, index) => {
              if (!set.permission || (set.permission && permissions && permissions.indexOf(set.permission) !== -1)) {
                return (
                  <div onClick={() => handleNavigate(set)} key={`list_settings_page__${index.toString()}`} className='col-md-4'>
                    <div className='settings__item'>
                      <div className='icon'>{set.icon ? set.icon : <Settings />}</div>
                      <div className='content'>
                        <div className='title'>{set.title}</div>
                        <div className='description'>{set.des}</div>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ auth, global }) => {
  return {
    accountInfo: auth.data.accountInfo,
    isMenuOpen: global.ui.isMenuOpen,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
