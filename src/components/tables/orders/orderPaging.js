import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import Paging from 'components/common/paging';

import { updateOrderTableFilterAction } from './actions';

const OrderPaging = ({ totalPage, page, reducer, updateOrderTableFilterAction }) => {
  const goToPage = (page) => {
    updateOrderTableFilterAction({ payload: { page: page - 1 }, reducer });
  };

  return (
    <div className='d-flex justify-content-center mt-3'>
      <Paging items={totalPage} activePage={page + 1} onSelect={goToPage} />
    </div>
  );
};

const mapStateToProps = ({ orderTable }, ownProps) => {
  const { reducer } = ownProps;
  const totalPage = get(orderTable, `${reducer}.table.totalPage`) || [];
  const page = get(orderTable, `${reducer}.filter.page`);

  return {
    totalPage,
    page,
  };
};

const mapDispatchToProps = { updateOrderTableFilterAction };

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaging);
