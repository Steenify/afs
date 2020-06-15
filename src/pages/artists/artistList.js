import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

import Button from 'components/common/button';

import DataTable from 'components/common/DataTable';
import InPageLoading from 'components/common/inPageLoading';

import { getPaginationItemsNumber } from 'utils';

import { getArtistsListAction } from './actions';

const ArtistList = (props) => {
  // const { t } = useTranslation();
  const { artists = [], getArtistsList, loading, totalItems } = props;

  useEffect(() => {
    getArtistsList();
  }, [getArtistsList]);

  let columns = [
    {
      accessor: 'fullName',
      Header: 'Artist Name',
      minWidth: 100,
      Cell: ({ row: { original } }) => {
        return (
          <Button
            tag={Link}
            className='w-100 justify-content-start'
            to={`/artists/${original?.login}`}
            color='link'>
            {original?.fullName ||
              `${original?.firstName || ''} ${original?.lastName || ''}`}
          </Button>
        );
      },
    },
    {
      accessor: 'email',
      Header: 'Contact',
      minWidth: 100,
      Cell: ({ row: { original } }) => (
        <div>
          {original.email && <div>Email: {original.email}</div>}
          {original.ig && <div>Instagram: {original.ig}</div>}
          {original.phoneNumber && (
            <div>
              Phone: {original.phonePrefix}
              {original.phoneNumber}
            </div>
          )}
        </div>
      ),
    },
    {
      accessor: 'note',
      Header: 'Note',
      minWidth: 150,
      Cell: ({ row: { original } }) => (
        <div className=''>{original.note || 'N/A'}</div>
      ),
    },
    {
      accessor: 'totalInProgress',
      Header: 'Progress',
      Cell: ({ row: { original } }) => (
        <div className=''>{original.totalInProgress} Orders</div>
      ),
    },
    {
      accessor: 'totalDone',
      Header: 'Processed',
      Cell: ({ row: { original } }) => (
        <div className=''>{original.totalDone} Orders</div>
      ),
    },
  ];

  const handleLoad = ({ page, size, sortBy }) => {
    const params = {
      page,
      size,
      sort: sortBy,
    };
    getArtistsList(params);
  };

  return (
    <div>
      <DataTable
        data={artists}
        columns={columns}
        className='bg-white'
        whiteListSort={['email', 'note', 'totalInProgress', 'totalDone']}
        serverSide
        totalPage={(size) => getPaginationItemsNumber(totalItems, size)}
        onLoad={handleLoad}
      />
      <InPageLoading isLoading={loading} />
    </div>
  );
};

const mapStateToProps = ({ artists, auth }) => ({
  loading: artists.ui.loading,
  artists: artists.data.artists,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {
  getArtistsList: getArtistsListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
