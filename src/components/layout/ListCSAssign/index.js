import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { debounce } from 'lodash';

import { getCSService } from 'services/cs.service';

import { actionTryCatchCreator } from 'utils';

import './style.scss';

class ListCS extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      cs_list: [],
      text: '',
    };

    this.handleGetArtist = debounce(this.handleGetArtist, 500);
  }

  componentDidMount() {
    this.handleGetArtist();
  }

  handleChangeText = (e) => {
    const { value } = e.target;
    this.setState(
      {
        text: value,
      },
      () => {
        this.handleGetArtist();
      },
    );
  };

  handleGetArtist = () => {
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
        cs_list: data,
        isLoading: false,
      });
    };
    const onError = (error) => {
      console.log('handleGetArtist', JSON.stringify(error));
      this.setState({
        isLoading: false,
      });
    };

    actionTryCatchCreator({
      service: getCSService(params),
      onPending,
      onSuccess,
      onError,
    });
  };

  render() {
    const { cs_list, isLoading, text } = this.state;
    console.log('ListCS -> render -> cs_list', cs_list);
    const { onSave, cs } = this.props;
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
                <button onClick={() => onSave({ login: 'null' })} key={`list__cs__login`} className={`artist__select `}>
                  <strong className='name'>____________Select____________</strong>
                  <div className='status'></div>
                </button>
                {cs_list.map((cus) => {
                  return (
                    <button onClick={() => onSave(cus)} key={`list__cs__${cus.login}`} className={`artist__select ${cus.login === cs?.login ? 'active' : ''}`}>
                      <div className='avt'>
                        <img src={`https://ui-avatars.com/api/?name=${cus?.fullName || ''}${cus?.firstName || ''}${cus?.lastName || ''}`} alt='comments__author' />
                      </div>

                      <div className='info'>
                        <strong className='name'>{cus?.fullName || `${cus?.firstName} ${cus?.lastName}`}</strong>
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

export default ListCS;
