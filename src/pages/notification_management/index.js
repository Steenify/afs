import React from 'react';
import { useTranslation } from 'react-i18next';
import NotificationList from './NotificationList';
import NotificationCreate from './NotificationCreate';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';

import { WEB_ROUTES } from 'config';

const NotificationManagement = () => {
  const { t } = useTranslation();

  return (
    <Layout
      documentTitle={t(WEB_ROUTES.NOTIFICATION_LIST.title)}
      container
      fluid>
      <Breadcrumb
        data={[
          {
            title: t(WEB_ROUTES.NOTIFICATION_LIST.title),
            active: false,
            path: '/notification',
          },
        ]}
      />
      <PageTitle
        title={t(WEB_ROUTES.NOTIFICATION_LIST.title)}
        className='mb-0 mr-3'>
        <NotificationCreate />
      </PageTitle>
      <NotificationList />
    </Layout>
  );
};

export default NotificationManagement;
