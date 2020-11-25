import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import ProductNameCell from './cells/productNameCell';
import ProductSelectedCell from './cells/productSelectedCell';
import ProductSelectedAllCell from './cells/productSelectedAllCell';

import ProductBulkAction from './productBulkAction';
import ProductFlowCell from './cells/productFlowCell';

const columns = [
  {
    accessor: 'selected',
    Header: ProductSelectedAllCell,
    minWidth: 40,
    Cell: ProductSelectedCell,
  },
  {
    accessor: 'name',
    Header: 'Name',
    Cell: ProductNameCell,
  },
  {
    accessor: 'flowId',
    Header: 'Flow',
    Cell: ProductFlowCell,
  },
];

const ProductTable = (props) => {
  const { loading, ids } = props;

  const canApplyWorkflow = true;

  return (
    <div className={`payouts__list relative`}>
      <div className={`payouts__loading ${!loading && 'd-none'}`}>
        <Spinner /> <span className='text'>Loading</span>
      </div>
      {canApplyWorkflow && <ProductBulkAction />}
      <div className='table-responsive bg-light steenify-table bg-white payout__table'>
        <table className='table'>
          <TableHeader columns={columns} />
          <TableBody data={ids} columns={columns} />
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ products, auth }) => ({
  ids: products.data.ids,
  loading: products.ui.loading,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
