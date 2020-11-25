import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductFilters from './productFilters';
import ProductPaging from './productPaging';
import ProductTable from './productTable';

import { getProductsAction } from './actions';

class ProductList extends Component {
  componentDidMount() {
    const { getProductsAction } = this.props;
    getProductsAction();
  }
  render() {
    return (
      <div className='artists__page'>
        <div className='artists__header box'>
          <ProductFilters />
        </div>
        <div className='artists__body'>
          <ProductTable />
        </div>
        <div className='artists__paging'>
          <ProductPaging />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getProductsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
