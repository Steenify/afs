import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import SelectCell from './cellsAndHeaders/selectCell';
import SelectHeader from './cellsAndHeaders/selectHeader';
import ActionCell from './cellsAndHeaders/action';
import TimeCell from './cellsAndHeaders/time';
import StatusCell from './cellsAndHeaders/status';
import ContentCell from './cellsAndHeaders/content';
import OrdersCell from './cellsAndHeaders/orders';

const columns = [
  {
    accessor: 'selected',
    minWidth: 40,
    Cell: SelectCell,
    Header: SelectHeader,
  },
  {
    accessor: 'login',
    minWidth: 200,
    Cell: TimeCell,
    Header: 'Time',
  },
  {
    accessor: 'order',
    minWidth: 200,
    Cell: OrdersCell,
    Header: 'Late Order Number',
  },
  {
    accessor: 'status',
    minWidth: 200,
    Cell: StatusCell,
    Header: 'Status',
  },
  {
    accessor: 'totalOrder',
    minWidth: 150,
    Cell: ContentCell,
    Header: 'Content',
  },
  {
    accessor: 'value',
    minWidth: 100,
    Cell: ActionCell,
    Header: 'Action',
  },
];

class TableList extends PureComponent {
  render() {
    const { loading, ids } = this.props;

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

const mapStateToProps = ({
  lateNotification: {
    listing: {
      data: { ids },
      ui: { loading },
    },
  },
}) => ({
  ids,
  loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
