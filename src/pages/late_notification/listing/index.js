import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from 'components/common/Layout';
import { getLateNotificationAction, updateFilterAction, getLateNotificationTemplateAction } from './action';
import { WEB_ROUTES } from 'configs';
import { initialState } from './const';
import Paging from 'components/common/paging';
import Title from './title';
import { useTranslation } from 'react-i18next';
import Table from './table';
import TemplatePreview from './templatePreviewModal';
import moment from 'moment';
import './style.scss';

const Listing = ({ filterData = initialState.filterData, data = initialState.data, getLateNotificationTemplateAction, getLateNotificationAction, updateFilterAction }) => {
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    getLateNotificationTemplateAction();
  }, [getLateNotificationTemplateAction]);

  useEffect(() => {
    const { page, size, tag, text } = filterData;
    getLateNotificationAction({ page, size, tag, text });
    const temp = moment(null);
  }, [getLateNotificationAction, filterData]);

  return (
    <Layout className='order__container' documentTitle={t(WEB_ROUTES.GALLERY_LISTING.title)} container fluid>
      <Title onClickUpload={undefined} />
      <div className='late_notification'>
        <Table />
      </div>
      <div className='d-flex justify-content-center'>
        <Paging items={data.totalPage} activePage={filterData.page + 1} onSelect={(p) => updateFilterAction({ page: p - 1 })} />
      </div>
      <TemplatePreview />
    </Layout>
  );
};

const mapStateToProps = ({ lateNotification: { listing } }) => {
  return { ...listing };
};

const mapDispatchToProps = {
  getLateNotificationAction,
  updateFilterAction,
  getLateNotificationTemplateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
