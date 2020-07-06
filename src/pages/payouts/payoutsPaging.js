import React from 'react';
import { connect } from 'react-redux';

import Paging from 'components/common/paging';

import { updatePayoutFilterAction, getPayoutListAction } from './actions';

const PayoutsPaging = ({
  totalPage,
  page,
  updatePayoutFilter,
  getPayoutList,
}) => {
  const gotoPage = (page) => {
    console.log('gotoPage -> page', page);
    updatePayoutFilter({ page: page - 1 });
    getPayoutList({});
  };
  return (
    <div className='d-flex justify-content-center'>
      <Paging items={totalPage} activePage={page + 1} onSelect={gotoPage} />
    </div>
  );
};

const mapStateToProps = ({ payouts }) => {
  const { totalPage } = payouts.list;
  const { page } = payouts.filter;

  return {
    totalPage,
    page,
  };
};

const mapDispatchToProps = {
  updatePayoutFilter: updatePayoutFilterAction,
  getPayoutList: getPayoutListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsPaging);
