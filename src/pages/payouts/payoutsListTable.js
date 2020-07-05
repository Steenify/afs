import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import { PERMITTIONS_CONFIG } from 'config';

import PayoutsSelectedAll from './payoutsSelectedAll';
import PayoutsSelectedCell from './payoutsSelectedCell';
import PayoutsDateCell from './payoutsDateCell';
import PayoutsAmountCell from './payoutsAmountCell';
import PayoutsNoteCell from './payoutsNoteCell';
import PayoutsEvidenceCell from './payoutsEvidenceCell';
import PayoutsArtistCell from './payoutsArtistCell';

class OrderListDesktop extends PureComponent {
  goToDetail = (code) => {
    const { history } = this.props;
    if (code) {
      history.push(`/payouts/${code}`);
    }
  };

  render() {
    const { loading, ids } = this.props;

    let columns = [
      {
        accessor: 'selected',
        minWidth: 40,
        Cell: PayoutsSelectedCell,
        Header: PayoutsSelectedAll,
      },
      {
        accessor: 'createdDate',
        minWidth: 40,
        Cell: PayoutsDateCell,
        Header: 'Date',
      },
      {
        accessor: 'artist',
        minWidth: 40,
        Cell: PayoutsArtistCell,
        Header: 'Artist',
      },
      {
        accessor: 'totalPaid',
        minWidth: 40,
        Cell: PayoutsAmountCell,
        Header: 'Amount',
      },
      {
        accessor: 'note',
        minWidth: 40,
        Cell: PayoutsNoteCell,
        Header: 'Note',
      },
      {
        accessor: 'attachments',
        minWidth: 40,
        Cell: PayoutsEvidenceCell,
        Header: 'Evidence',
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
            <TableBody
              cellProps={{ goToDetail: this.goToDetail }}
              data={ids}
              columns={columns}
            />
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ payouts, auth }) => ({
  ids: payouts.list.ids,
  loading: payouts.ui.loading,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(OrderListDesktop));
