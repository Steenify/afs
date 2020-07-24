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
    const { updateCustomerFilterAction, name } = this.props;
    updateCustomerFilterAction({
      name,
      page: 0,
    });
  }

  handleChangeText = (e) => {
    this.handleSearchTextAPI(e.target.value);
  };

  handleChangeGroup = (e) => {
    const { updateCustomerFilterAction } = this.props;
    const customerGroup = e.target.getAttribute('data');
    updateCustomerFilterAction({
      name: '',
      page: 0,
      customerGroup,
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
    const { name, customerGroup } = this.props;

    return (
      <div className='customers__filters'>
        <div className='list_status d-none d-sm-block'>
          <button data='' onClick={this.handleChangeGroup} key={`list__status_option__all`} className={`status ${customerGroup === '' && 'active'}`}>
            All
          </button>
          <button data='NEW' onClick={this.handleChangeGroup} key={`list__status_option__new`} className={`status ${customerGroup === 'NEW' && 'active'}`}>
            New
          </button>
          <button data='RETURNING' onClick={this.handleChangeGroup} key={`list__status_option__returning`} className={`status ${customerGroup === 'RETURNING' && 'active'}`}>
            Returning
          </button>
        </div>
        <div className='filter__main'>
          <div className='filter__text'>
            <input type='text' defaultValue={name} placeholder='Search customers' className='search__box form-control' onChange={this.handleChangeText} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ customers }) => {
  return {
    name: customers.filter.name,
    customerGroup: customers.filter.customerGroup,
  };
};

const mapDispatchToProps = {
  updateCustomerFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersFilters);
