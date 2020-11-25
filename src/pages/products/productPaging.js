import React from 'react';
import { connect } from 'react-redux';

import Paging from 'components/common/paging';

import { updateProductFiltersAction } from './actions';

const ProductPaging = ({ totalPage, page, updateProductFiltersAction }) => {
  const gotoPage = (page) => {
    updateProductFiltersAction({ page: page - 1 });
  };
  return (
    <div className='d-flex justify-content-center'>
      <Paging items={totalPage} activePage={page + 1} onSelect={gotoPage} />
    </div>
  );
};

const mapStateToProps = ({ products }) => {
  const { totalPage } = products.data;
  const { page } = products.filter;

  return {
    totalPage,
    page,
  };
};

const mapDispatchToProps = {
  updateProductFiltersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPaging);
