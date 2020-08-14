import React from 'react';
import { useTranslation } from 'react-i18next';
import NotificationList from './notificationList';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';

import { WEB_ROUTES } from 'configs';

const NotificationManagement = () => {
  const { t } = useTranslation();

  return (
    <Layout documentTitle={t(WEB_ROUTES.NOTIFICATION_LIST.title)} container fluid>
      <PageTitle title={t(WEB_ROUTES.NOTIFICATION_LIST.title)} className='mr-3'></PageTitle>
      <NotificationList />
    </Layout>
  );
};

export default NotificationManagement;
