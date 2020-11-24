import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import SelectionHeader from './headers/selection';
import SelectionCell from './cells/selection';
import FullNameCell from './cells/fullName';
import StatusCell from './cells/status';
import TypeCell from './cells/type';
import DateCell from './cells/date';
import BulkActions from './reminderBulkActions';

const columns = [
  {
    accessor: 'selected',
    width: 40,
    Cell: SelectionCell,
    Header: SelectionHeader,
  },
  {
    accessor: 'login',
    minWidth: 200,
    Cell: FullNameCell,
    Header: 'Customer Name',
  },
  {
    accessor: 'date',
    minWidth: 100,
    Cell: DateCell,
    Header: 'Date',
  },
  {
    accessor: 'type',
    minWidth: 200,
    Cell: TypeCell,
    Header: 'Type',
  },
  {
    accessor: 'status',
    minWidth: 200,
    Cell: StatusCell,
    Header: 'Status',
  },
];

const ListTable = (props) => {
  const { loading, ids } = props;

  return (
    <div className={`payouts__list relative`}>
      <div className={`payouts__loading ${!loading && 'd-none'}`}>
        <Spinner /> <span className='text'>Loading</span>
      </div>
      <BulkActions />
      <div className='table-responsive bg-light steenify-table bg-white customers__table'>
        <table className='table'>
          <TableHeader columns={columns} />
          <TableBody data={ids} columns={columns} />
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ customersCare }) => ({
  ids: customersCare.list.ids,
  loading: customersCare.ui.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListTable));
