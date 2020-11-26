import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import ComponentNameCell from './cells/componentNameCell';

const columns = [
  {
    accessor: 'name',
    Header: 'Name',
    Cell: ComponentNameCell,
  },
];

const ComponentTable = (props) => {
  const { loading, ids } = props;

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

const mapStateToProps = ({ uiComponents, auth }) => ({
  ids: uiComponents.data.ids,
  loading: uiComponents.ui.loading,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentTable);
