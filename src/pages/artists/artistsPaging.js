import React from 'react';
import { connect } from 'react-redux';

import Paging from 'components/common/paging';

import { updateArtistFilterAction, getArtistsListAction } from './actions';

const ArtistsPaging = ({
  totalPage,
  page,
  updateArtistFilter,
  getArtistsList,
}) => {
  const gotoPage = (page) => {
    updateArtistFilter({ page: page - 1 });
    getArtistsList({});
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
  updateArtistFilter: updateArtistFilterAction,
  getArtistsList: getArtistsListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPaging);
