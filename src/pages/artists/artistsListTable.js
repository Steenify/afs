import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import ArtistFullNameCell from './artistFullNameCell';
import ArtistNoteCell from './artistNoteCell';
import ArtistWorkLoadCell from './artistWorkLoadCell';

import ArtistSelectedCell from './artistSelectedCell';
import ArtistSelectedAll from './artistSelectedAll';

import ArtistUpdateContactCell from './artistUpdateContactCell';
import ArtistTotalDoneCell from './artistTotalDoneCell';
import ArtistWorkingQualityCell from './artistWorkingQualityCell';
import ArtistWorkingSpeedCell from './artistWorkingSpeedCell';
import ArtistWorkingAttitudeCell from './artistWorkingAttitudeCell';

class ArtistListTable extends PureComponent {
  render() {
    const { loading, ids } = this.props;

    let columns = [
      {
        accessor: 'selected',
        Header: ArtistSelectedAll,
        minWidth: 40,
        Cell: ArtistSelectedCell,
      },
      {
        accessor: 'fullName',
        Header: 'Artist Name',
        minWidth: 100,
        Cell: ArtistFullNameCell,
      },
      {
        accessor: 'productQualityScore',
        Header: 'Quality',

        Cell: ArtistWorkingQualityCell,
      },
      {
        accessor: 'workingSpeedScore',
        Header: 'Speed',
        Cell: ArtistWorkingSpeedCell,
      },
      {
        accessor: 'workingAttitudeScore',
        Header: 'Attitude',
        Cell: ArtistWorkingAttitudeCell,
      },
      {
        accessor: 'workload',
        Header: 'Work Load',
        minWidth: 150,
        Cell: ArtistWorkLoadCell,
      },
      {
        accessor: 'totalDone',
        Header: 'Done',
        Cell: ArtistTotalDoneCell,
        style: {
          textAlign: 'right',
        },
      },
      {
        accessor: 'note',
        Header: 'Note',
        minWidth: 150,
        Cell: ArtistNoteCell,
      },
      {
        accessor: 'uid',
        Header: 'Contact',
        minWidth: 100,
        Cell: ArtistUpdateContactCell,
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
