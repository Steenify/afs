import React from 'react';
import { connect } from 'react-redux';

import Paging from 'components/common/paging';

import { updateReminderFilterAction } from './actions';

const ReminderPaging = ({ totalPage, page, updateReminderFilterAction }) => {
  const gotoPage = (page) => {
    updateReminderFilterAction({ page: page - 1 });
  };
  return (
    <div className='d-flex justify-content-center'>
      <Paging items={totalPage} activePage={page + 1} onSelect={gotoPage} />
    </div>
  );
};

const mapStateToProps = ({ customersCare }) => {
  const { totalPage } = customersCare.list;
  const { page } = customersCare.filter;

  return {
    totalPage,
    page,
  };
};

const mapDispatchToProps = { updateReminderFilterAction };

export default connect(mapStateToProps, mapDispatchToProps)(ReminderPaging);
