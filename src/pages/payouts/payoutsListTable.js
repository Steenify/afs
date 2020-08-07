import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { remove } from 'lodash';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import { PERMITTIONS_CONFIG } from 'configs';

import PayoutsSelectedAll from './payoutsSelectedAll';
import PayoutsSelectedCell from './payoutsSelectedCell';
import PayoutsDateCell from './payoutsDateCell';
import PayoutsAmountCell from './payoutsAmountCell';
import PayoutsNoteCell from './payoutsNoteCell';
import PayoutsEvidenceCell from './payoutsEvidenceCell';
import PayoutsArtistCell from './payoutsArtistCell';
import PayoutsTransactionCell from './payoutsTransactionCell';

const OrderListDesktop = (props) => {
  const { loading, ids, accountInfo } = props;
  let columns = [
    {
      accessor: 'selected',
      minWidth: 40,
      Cell: PayoutsSelectedCell,
      Header: PayoutsSelectedAll,
    },
    {
      accessor: 'transactionId',
      minWidth: 200,
      Cell: PayoutsTransactionCell,
      Header: 'Transaction',
    },
    {
      accessor: 'createdDate',
      minWidth: 100,
      Cell: PayoutsDateCell,
      Header: 'Date',
    },
    {
      accessor: 'artist',
      minWidth: 120,
      Cell: PayoutsArtistCell,
      Header: 'Artist',
    },
    {
      accessor: 'totalPaid',
      minWidth: 80,
      Cell: PayoutsAmountCell,
      Header: 'Amount',
    },
    {
      accessor: 'note',
      minWidth: 350,
      Cell: PayoutsNoteCell,
      Header: 'Note',
    },
    {
      accessor: 'attachments',
      minWidth: 100,
      Cell: PayoutsEvidenceCell,
      Header: 'Evidence',
    },
  ];

  if (!accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.CREATE_PAYOUT)) {
    columns = remove(columns, (col) => col.Header !== 'Artist');
  }

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
};

const mapStateToProps = ({ payouts, auth }) => ({
  ids: payouts.list.ids,
  loading: payouts.ui.loading,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderListDesktop));
