import React, { Component } from 'react';
import { connect } from 'react-redux';

import WorkflowFilters from './workflowFilters';
import WorkflowPaging from './workflowPaging';
import WorkflowTable from './workflowTable';

import { getWorkflowListAction } from './actions';

class WorkflowList extends Component {
  componentDidMount() {
    const { getWorkflowListAction } = this.props;
    getWorkflowListAction();
  }
  render() {
    return (
      <div className='artists__page'>
        <div className='artists__header box'>
          <WorkflowFilters />
        </div>
        <div className='artists__body'>
          <WorkflowTable />
        </div>
        <div className='artists__paging'>
          <WorkflowPaging />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getWorkflowListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowList);
