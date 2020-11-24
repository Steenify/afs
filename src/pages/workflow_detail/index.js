import React from 'react';
// import { useTranslation } from 'react-i18next';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';

import { WEB_ROUTES } from 'configs';

import Detail from './workflowDetail';

import './style.scss';

const WorkflowDetail = () => {
  // const { t } = useTranslation();
  return (
    <Layout documentTitle={WEB_ROUTES.WORKFLOW_DETAIL.title} container fluid>
      <Breadcrumb data={[{ title: WEB_ROUTES.WORKFLOW_DETAIL.title, isBack: true }]} />
      <Detail />
    </Layout>
  );
};

export default WorkflowDetail;
