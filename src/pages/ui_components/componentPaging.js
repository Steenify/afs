import React from 'react';
import { connect } from 'react-redux';

import Paging from 'components/common/paging';

import { updateComponentFiltersAction } from './actions';

const ComponentPaging = ({ totalPage, page, updateComponentFiltersAction }) => {
  const gotoPage = (page) => {
    updateComponentFiltersAction({ page: page - 1 });
  };
  return (
    <div className='d-flex justify-content-center'>
      <Paging items={totalPage} activePage={page + 1} onSelect={gotoPage} />
    </div>
  );
};

const mapStateToProps = ({ uiComponents }) => {
  const { totalPage } = uiComponents.data;
  const { page } = uiComponents.filter;

  return {
    totalPage,
    page,
  };
};

const mapDispatchToProps = {
  updateComponentFiltersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentPaging);
