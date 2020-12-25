import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { debounce } from 'lodash';

import { getBookingStoreService } from 'services/order';

import { actionTryCatchCreator } from 'utils';

import './style.scss';

class ListStoreAssign extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store_list: [],
      text: '',
    };

    this.handleGetStore = debounce(this.handleGetStore, 500);
  }

  componentDidMount() {
    this.handleGetStore();
  }

  handleChangeText = (e) => {
    const { value } = e.target;
    this.setState(
      {
        text: value,
      },
      () => {
        this.handleGetStore();
      },
    );
  };

  handleGetStore = () => {
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
        store_list: data,
        isLoading: false,
      });
    };
    const onError = (error) => {
      console.log('handleGetStore', JSON.stringify(error));
      this.setState({
        isLoading: false,
      });
    };

    actionTryCatchCreator({
      service: getBookingStoreService(params),
      onPending,
      onSuccess,
      onError,
    });
  };

  render() {
    const { store_list, isLoading, text } = this.state;
    const { onSave, store, canUnAssign } = this.props;
    return (
      <div className='order__info p-3 list_artist_assign'>
        <div className='order__artist'>
          <div className='search mb-3'>
            <input type='text' placeholder='Search Customer Service' value={text} onChange={this.handleChangeText} className='form-control search__input search__box' />
          </div>

          <div className='list mb-3'>
            {isLoading ? (
              <div style={{ minHeight: '100px' }} className=' d-flex align-items-center justify-content-center'>
                <Spinner />
              </div>
            ) : (
              <div>
                {canUnAssign ? (
                  <button onClick={() => onSave({ id: '', name: '' })} key={`list__artist__all`} className={`artist__select ${!store?.id ? 'active' : ''}`}>
                    <div className='avt'>
                      <img src={`https://ui-avatars.com/api/?name=${'all'}`} alt='comments__author' />
                    </div>

                    <div className='info'>
                      <strong className='name'>____________</strong>
                      <div className='status'></div>
                    </div>
                  </button>
                ) : null}
                {store_list.map((sto) => {
                  return (
                    <button onClick={() => onSave(sto)} key={`list__cs__${sto.id}`} className={`artist__select align-items-center ${sto.id === store?.id ? 'active' : ''}`}>
                      <div className='avt'>
                        <img src={`https://ui-avatars.com/api/?name=${sto?.name || ''}`} alt='comments__author' />
                      </div>

                      <div className='info'>
                        <strong className='name mb-0'>{sto?.name}</strong>
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

export default ListStoreAssign;
