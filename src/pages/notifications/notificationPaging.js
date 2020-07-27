import React from 'react';
import { connect } from 'react-redux';

import Paging from 'components/common/paging';

import { updateNotificationFilterAction } from './actions';

const NotificationPaging = ({ totalPage, page, updateNotificationFilterAction }) => {
  const gotoPage = (page) => {
    updateNotificationFilterAction({ page: page - 1 });
  };
  return (
    <div className='d-flex justify-content-center'>
      <Paging items={totalPage} activePage={page + 1} onSelect={gotoPage} />
    </div>
  );
};

const mapStateToProps = ({ notification }) => {
  const { totalPage } = notification.data;
  const { page } = notification.filter;

  return {
    totalPage,
    page,
  };
};

const mapDispatchToProps = { updateNotificationFilterAction };

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPaging);
