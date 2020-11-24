import React from 'react';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';

import { WEB_ROUTES } from 'configs';
import { useTranslation } from 'react-i18next';

import WorkflowCreateModal from './workflowCreateModal';
import WorkflowList from './workflowList';

const Workflows = () => {
  const { t } = useTranslation();
  return (
    <Layout className='order__container' documentTitle={t(WEB_ROUTES.WORKFLOWS.title)} container fluid>
      <PageTitle title={WEB_ROUTES.WORKFLOWS.title} className='mb-3 mr-3'>
        <WorkflowCreateModal containerClassName='ml-auto mb-2' />
      </PageTitle>
      <WorkflowList />
    </Layout>
  );
};

export default Workflows;
