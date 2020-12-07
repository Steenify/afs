import React, { Component } from 'react';
import { connect } from 'react-redux';

import ComponentFilters from './componentFilters';
import ComponentPaging from './componentPaging';
import ComponentTable from './componentTable';

import { getComponentsAction } from './actions';

class ComponentList extends Component {
  componentDidMount() {
    const { getComponentsAction } = this.props;
    getComponentsAction();
  }

  render() {
    return (
      <div className='artists__page'>
        <div className='artists__header box'>
          <ComponentFilters />
        </div>
        <div className='artists__body'>
          <ComponentTable />
        </div>
        <div className='artists__paging'>
          <ComponentPaging />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getComponentsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentList);
