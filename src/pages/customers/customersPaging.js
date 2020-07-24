import React from 'react';
import { connect } from 'react-redux';

import Paging from 'components/common/paging';

import { updateCustomerFilterAction } from './actions';

const PayoutsPaging = ({ totalPage, page, updateCustomerFilterAction }) => {
  const gotoPage = (page) => {
    updateCustomerFilterAction({ page: page - 1 });
  };
  return (
    <div className='d-flex justify-content-center'>
      <Paging items={totalPage} activePage={page + 1} onSelect={gotoPage} />
    </div>
  );
};

const mapStateToProps = ({ customers }) => {
  const { totalPage } = customers.list;
  const { page } = customers.filter;

  return {
    totalPage,
    page,
  };
};

const mapDispatchToProps = { updateCustomerFilterAction };

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsPaging);
