import React, { PureComponent } from 'react';
import { Spinner } from 'reactstrap';
import { debounce } from 'lodash';

import { getCustomersService } from 'services/customers';

import { actionTryCatchCreator } from 'utils';

class ListArtists extends PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      customers: [],
      text: '',
    };

    this.handleGetCustomer = debounce(this.handleGetCustomer, 500);
  }

  componentDidMount() {
    this.handleGetCustomer();
  }

  handleChangeText = (e) => {
    const { value } = e.target;
    this.setState(
      {
        text: value,
      },
      () => {
        this.handleGetCustomer();
      },
    );
  };

  handleGetCustomer = () => {
    const { text } = this.state;
    const params = {
      name: text,
    };

    const onPending = () => {
      this.setState({
        isLoading: true,
      });
    };
    const onSuccess = (data) => {
      this.setState({
        customers: data,
        isLoading: false,
      });
    };
    const onError = (error) => {
      console.log('handleGetCustomer', JSON.stringify(error));
      this.setState({
        isLoading: false,
      });
    };

    actionTryCatchCreator({
      service: getCustomersService(params),
      onPending,
      onSuccess,
      onError,
    });
  };

  render() {
    const { customers, isLoading, text } = this.state;
    const { onSave, currentCustomer } = this.props;
    return (
      <div className='order__info p-3 list_artist_assign'>
        <div className='order__artist'>
          <div className='search mb-3'>
            <input type='text' placeholder='Search Customer' value={text} onChange={this.handleChangeText} className='form-control search__input search__box' />
          </div>
          <div className='list mb-3'>
            {isLoading ? (
              <div style={{ minHeight: '100px' }} className=' d-flex align-items-center justify-content-center'>
                <Spinner />
              </div>
            ) : (
              <div>
                {customers.map((cus) => {
                  return (
                    <button onClick={() => onSave(cus)} key={`list__customer__${cus.login}`} className={`artist__select ${cus.login === currentCustomer?.login ? 'active' : ''}`}>
                      <div className='avt'>
                        <img src={`https://ui-avatars.com/api/?name=${cus?.fullName || ''}${cus?.firstName || ''}${cus?.lastName || ''}`} alt='comments__author' />
                      </div>

                      <div className='info'>
                        <strong className='name'>{cus?.fullName || `${cus?.firstName} ${cus?.lastName}`}</strong>
                        <div className='status'>
                          {cus?.email && <div className='note currProgress text-break'>{`${cus?.email}`}</div>}
                          {cus?.phoneNumber && <div className='note currProgress text-break'>{`${cus?.phoneNumber}`}</div>}
                          <div className='currProgress'>Orders: {cus?.totalOrder}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ListArtists;
