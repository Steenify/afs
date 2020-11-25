import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { updateProductFiltersAction } from './actions';
import ProductFilterCollection from './productFilterCollection';

class ProductFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
  }

  handleChangeText = (e) => {
    const { value } = e.target;
    this.handleSearchTextAPI(value);
  };

  handleSearchTextAPI = (value) => {
    const { updateProductFiltersAction } = this.props;
    updateProductFiltersAction({
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
            <input type='text' defaultValue={text} placeholder='Search Products' className='search__box form-control' onChange={this.handleChangeText} />
          </div>
          <div className='filter__filters'>
            <ProductFilterCollection />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  text: products.filter.text,
});

const mapDispatchToProps = {
  updateProductFiltersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilters);
