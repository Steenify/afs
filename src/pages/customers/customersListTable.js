import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import CustomersSelectedAll from './customersSelectedAll';
import CustomersSelectedCell from './customersSelectedCell';
import CustomersFullNameCell from './customersFullNameCell';
import CustomersAddressCell from './customersAddressCell';
import CustomersOverviewCell from './customersOverviewCell';
import CustomersOrderCell from './customersOrderCell';
import CustomersValueCell from './customersValueCell';
import CustomersUpdateContactCell from './customersUpdateContactCell';

const columns = [
  {
    accessor: 'selected',
    minWidth: 40,
    Cell: CustomersSelectedCell,
    Header: CustomersSelectedAll,
  },
  {
    accessor: 'login',
    minWidth: 200,
    Cell: CustomersFullNameCell,
    Header: 'Customer Name',
  },
  {
    accessor: 'address',
    minWidth: 200,
    Cell: CustomersAddressCell,
    Header: 'Address',
  },
  {
    accessor: 'overview',
    minWidth: 200,
    Cell: CustomersOverviewCell,
    Header: 'Overview',
  },
  {
    accessor: 'totalOrder',
    minWidth: 100,
    Cell: CustomersOrderCell,
    Header: 'Order',
  },
  {
    accessor: 'value',
    minWidth: 100,
    Cell: CustomersValueCell,
    Header: 'Value',
  },
  {
    accessor: 'uid',
    Header: 'Contact',
    minWidth: 100,
    Cell: CustomersUpdateContactCell,
  },
];

class CustomerListDesktop extends PureComponent {
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

const mapStateToProps = ({ customers }) => ({
  ids: customers.list.ids,
  loading: customers.ui.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerListDesktop));
