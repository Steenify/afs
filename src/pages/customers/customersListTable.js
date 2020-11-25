import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import CustomersSelectedAll from './cells/customersSelectedAll';
import CustomersSelectedCell from './cells/customersSelectedCell';
import CustomersFullNameCell from './cells/customersFullNameCell';
import CustomersAddressCell from './cells/customersAddressCell';
import CustomersOverviewCell from './cells/customersOverviewCell';
import CustomersOrderCell from './cells/customersOrderCell';
import CustomersValueCell from './cells/customersValueCell';
import CustomersUpdateContactCell from './cells/customersUpdateContactCell';
import CustomersTagsCell from './cells/customersTagsCell';
import CustomersAnniversariesCell from './cells/customersAnniversariesCell';

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
  {
    accessor: 'tags',
    Header: 'Tags',
    minWidth: 200,
    Cell: CustomersTagsCell,
  },
  {
    accessor: 'anniversaries',
    Header: 'Anniversaries',
    minWidth: 200,
    Cell: CustomersAnniversariesCell,
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
        <div className='table-responsive bg-light steenify-table bg-white customers__table'>
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
