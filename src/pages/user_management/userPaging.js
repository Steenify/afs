import React from 'react';
import { connect } from 'react-redux';

import Paging from 'components/common/paging';

import { updateUserFilterAction } from './actions';

const UserPaging = ({ totalPage, page, updateUserFilterAction }) => {
  const gotoPage = (page) => {
    updateUserFilterAction({ page: page - 1 });
  };
  return (
    <div className='d-flex justify-content-center'>
      <Paging items={totalPage} activePage={page + 1} onSelect={gotoPage} />
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  const { totalPage } = user.list;
  const { page } = user.filter;

  return {
    totalPage,
    page,
  };
};

const mapDispatchToProps = { updateUserFilterAction };

export default connect(mapStateToProps, mapDispatchToProps)(UserPaging);
