import React from 'react';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import ComponentList from './componentList';

import { WEB_ROUTES } from 'configs';

import ComponentCreateModal from './componentCreateModal';

const UIComponents = () => {
  return (
    <Layout className='order__container' documentTitle={WEB_ROUTES.UI_COMPONENTS.title} container fluid>
      <PageTitle title={WEB_ROUTES.UI_COMPONENTS.title} className='mb-3 mr-3'>
        <ComponentCreateModal containerClassName='ml-auto mb-2' />
      </PageTitle>
      <ComponentList />
    </Layout>
  );
};

export default UIComponents;
