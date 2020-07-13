import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import ArtistFullNameCell from './artistFullNameCell';
import ArtistContactCell from './artistContactCell';
import ArtistNoteCell from './artistNoteCell';
import ArtistTotalProcessCell from './artistTotalProcessCell';
import ArtistTotalDoneCell from './artistTotalDoneCell';

class ArtistListTable extends PureComponent {
  render() {
    const { loading, ids } = this.props;

    let columns = [
      {
        accessor: 'fullName',
        Header: 'Artist Name',
        minWidth: 100,
        Cell: ArtistFullNameCell,
      },
      {
        accessor: 'email',
        Header: 'Contact',
        minWidth: 100,
        Cell: ArtistContactCell,
      },
      {
        accessor: 'note',
        Header: 'Note',
        minWidth: 150,
        Cell: ArtistNoteCell,
      },
      {
        accessor: 'totalInProgress',
        Header: 'Progress',
        Cell: ArtistTotalProcessCell,
      },
      {
        accessor: 'totalDone',
        Header: 'Processed',
        Cell: ArtistTotalDoneCell,
      },
    ];

    return (
      <div className={`payouts__list relative`}>
        <div className={`payouts__loading ${!loading && 'd-none'}`}>
          <Spinner /> <span className='text'>Loading</span>
        </div>
        <div className='table-responsive bg-light steenify-table bg-white payout__table'>
          <table className='table'>
            <TableHeader columns={columns} />
            <TableBody data={ids} columns={columns} />
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ artists, auth }) => ({
  ids: artists.data.ids,
  loading: artists.ui.loading,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistListTable);
