import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { debounce } from 'lodash';

import { getProductsService } from 'services/product';

import { actionTryCatchCreator } from 'utils';

import './style.scss';

class ListProducts extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      products: [],
      text: '',
    };

    this.handleGetProducts = debounce(this.handleGetProducts, 500);
  }

  componentDidMount() {
    this.handleGetProducts();
  }

  handleChangeText = (e) => {
    const { value } = e.target;
    this.setState(
      {
        text: value,
      },
      () => {
        this.handleGetProducts();
      },
    );
  };

  handleGetProducts = () => {
    const { text } = this.state;
    const params = {
      s: text,
    };

    const onPending = () => {
      this.setState({
        isLoading: true,
      });
    };
    const onSuccess = (data) => {
      this.setState({
        products: data.content,
        isLoading: false,
      });
    };
    const onError = (error) => {
      console.log('handleGetProducts', JSON.stringify(error));
      this.setState({
        isLoading: false,
      });
    };

    actionTryCatchCreator({
      service: getProductsService(params),
      onPending,
      onSuccess,
      onError,
    });
  };

  render() {
    const { products, isLoading, text } = this.state;
    const { onSelect, selected } = this.props;
    return (
      <div className='product_list'>
        <div className='product_list__search search mb-3'>
          <input type='text' placeholder='Search product' value={text} onChange={this.handleChangeText} className='form-control search__input search__box' />
        </div>

        <div className='product_list__content mb-3'>
          {isLoading ? (
            <div style={{ minHeight: '100px' }} className=' d-flex align-items-center justify-content-center'>
              <Spinner />
            </div>
          ) : (
            <div className='product_list__list'>
              {products.map((prod) => {
                return (
                  <button onClick={() => onSelect(prod)} key={`list__product__${prod.id}`} className={`product_list__item ${selected?.id === prod.id && 'selected'}`}>
                    {prod.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

ListProducts.defaultProps = {
  selected: {},
  onSelect: () => {},
};

export default ListProducts;
