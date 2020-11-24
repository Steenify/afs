import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { updateWorkflowFiltersAction } from './actions';

class WorkflowFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
  }

  handleChangeText = (e) => {
    const { value } = e.target;
    this.handleSearchTextAPI(value);
  };

  handleSearchTextAPI = (value) => {
    const { updateWorkflowFiltersAction } = this.props;
    updateWorkflowFiltersAction({
      text: value,
      page: 0,
    });
  };

  render() {
    const { text } = this.props;

    return (
      <div className='payouts__filters'>
        <div className='filter__main'>
          <div className='filter__text'>
            <input type='text' defaultValue={text} placeholder='Search Workflows' className='search__box form-control' onChange={this.handleChangeText} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ workflows }) => ({
  text: workflows.filter.text,
});

const mapDispatchToProps = {
  updateWorkflowFiltersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowFilters);
