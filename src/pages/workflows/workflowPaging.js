import React from 'react';
import { connect } from 'react-redux';

import Paging from 'components/common/paging';

import { updateWorkflowFiltersAction } from './actions';

const WorkflowPaging = ({ totalPage, page, updateWorkflowFiltersAction }) => {
  const gotoPage = (page) => {
    updateWorkflowFiltersAction({ page: page - 1 });
  };
  return (
    <div className='d-flex justify-content-center'>
      <Paging items={totalPage} activePage={page + 1} onSelect={gotoPage} />
    </div>
  );
};

const mapStateToProps = ({ workflows }) => {
  const { totalPage } = workflows.data;
  const { page } = workflows.filter;

  return {
    totalPage,
    page,
  };
};

const mapDispatchToProps = {
  updateWorkflowFiltersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowPaging);
