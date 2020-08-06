import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import { PERMITTIONS_CONFIG } from 'config';

import ArtistFullNameCell from './cells/artistFullNameCell';
import ArtistNoteCell from './cells/artistNoteCell';
import ArtistWorkLoadCell from './cells/artistWorkLoadCell';

import ArtistSelectedCell from './cells/artistSelectedCell';
import ArtistSelectedAll from './artistSelectedAll';

import ArtistUpdateContactCell from './cells/artistUpdateContactCell';
// import ArtistTotalDoneCell from './artistTotalDoneCell';
import ArtistWorkingQualityCell from './cells/artistWorkingQualityCell';
import ArtistWorkingSpeedCell from './cells/artistWorkingSpeedCell';
import ArtistWorkingAttitudeCell from './cells/artistWorkingAttitudeCell';
import ArtistUnpaidCell from './cells/artistUnpaidCell';
import ArtistsBulkAction from './artistsBulkAction';

let columns = [
  {
    accessor: 'selected',
    Header: ArtistSelectedAll,
    minWidth: 40,
    Cell: ArtistSelectedCell,
  },
  {
    accessor: 'fullName',
    Header: 'Name',
    minWidth: 100,
    Cell: ArtistFullNameCell,
  },
  {
    accessor: 'workingSpeedScore',
    Header: 'Speed',
    Cell: ArtistWorkingSpeedCell,
  },
  {
    accessor: 'productQualityScore',
    Header: 'Quality',

    Cell: ArtistWorkingQualityCell,
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
  // {
  //   accessor: 'totalDone',
  //   Header: 'Done',
  //   Cell: ArtistTotalDoneCell,
  //   style: {
  //     textAlign: 'right',
  //   },
  // },
  {
    accessor: 'totalUnpaid',
    Header: 'Unpaid',
    Cell: ArtistUnpaidCell,
    minWidth: 100,
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

class ArtistListTable extends PureComponent {
  render() {
    const { loading, ids, accountInfo } = this.props;

    const isCanPay = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.UPDATE_PAYMENT_STATUS);

    return (
      <div className={`payouts__list relative`}>
        <div className={`payouts__loading ${!loading && 'd-none'}`}>
          <Spinner /> <span className='text'>Loading</span>
        </div>
        {isCanPay && <ArtistsBulkAction />}
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
