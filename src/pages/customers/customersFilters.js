import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { updateCustomerFilterAction } from './actions';

class CustomersFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
  }

  componentDidMount() {
    const { updateCustomerFilterAction } = this.props;
    updateCustomerFilterAction({
      name: '',
      page: 0,
    });
  }

  handleChangeText = (e) => {
    this.handleSearchTextAPI(e.target.value);
  };

  handleChangeGroup = (e) => {
    const { updateCustomerFilterAction } = this.props;
    const customerGroups = e.target.getAttribute('data');
    updateCustomerFilterAction({
      name: '',
      page: 0,
      customerGroups,
    });
  };

  handleSearchTextAPI = (value) => {
    const { updateCustomerFilterAction } = this.props;
    updateCustomerFilterAction({
      name: value,
      page: 0,
    });
  };

  render() {
    const { name } = this.props;

    return (
      <div className='customers__filters'>
        <div className='list_status d-none d-sm-block'>
          <button data='' onClick={this.handleChangeGroup} key={`list__status_option__all`} className={`status active`}>
            All
          </button>
          <button data='new' onClick={this.handleChangeGroup} key={`list__status_option__new`} className={`status`}>
            New
          </button>
          <button data='returning' onClick={this.handleChangeGroup} key={`list__status_option__returning`} className={`status`}>
            Returning
          </button>
        </div>
        <div className='filter__main'>
          <div className='filter__text'>
            <input type='text' value={name} placeholder='Search customers' className='search__box form-control' onChange={this.handleChangeText} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ customers }) => {
  return {
    name: customers.filter.name,
  };
};

const mapDispatchToProps = {
  updateCustomerFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersFilters);
