import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import WorkflowNameCell from './cells/workflowNameCell';
import WorkflowDescriptionCell from './cells/workflowDescriptionCell';

const columns = [
  {
    accessor: 'name',
    Header: 'Name',
    Cell: WorkflowNameCell,
  },
  {
    accessor: 'description',
    Header: 'Description',
    Cell: WorkflowDescriptionCell,
  },
];

const WorkflowTable = (props) => {
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

const mapStateToProps = ({ workflows, auth }) => ({
  ids: workflows.data.ids,
  loading: workflows.ui.loading,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowTable);
