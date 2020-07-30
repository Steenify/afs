import React from 'react';
import { connect } from 'react-redux';

import Paging from 'components/common/paging';

const OrderPaging = ({ totalPage, page, gotoPage }) => {
  return (
    <div className='d-flex justify-content-center'>
      <Paging items={totalPage} activePage={page + 1} onSelect={gotoPage} />
    </div>
  );
};

const mapStateToProps = ({ order }) => {
  const { totalPage } = order.table;
  const { page } = order.filter;

  return {
    totalPage,
    page,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaging);
