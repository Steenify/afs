import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { debounce } from 'lodash';

import { getAllContactsService } from 'services/contact';

import { actionTryCatchCreator } from 'utils';

import './style.scss';

class ListContact extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      contacts: [],
      text: '',
    };

    this.handleGetContact = debounce(this.handleGetContact, 500);
  }

  componentDidMount() {
    this.handleGetContact();
  }

  handleChangeText = (e) => {
    const { value } = e.target;
    this.setState(
      {
        text: value,
      },
      () => {
        this.handleGetContact();
      },
    );
  };

  handleGetContact = () => {
    const { text } = this.state;
    const params = {
      s: text,
      channelName: 'TN Art Operation',
    };

    const onPending = () => {
      this.setState({
        isLoading: true,
      });
    };
    const onSuccess = (data) => {
      this.setState({
        contacts: data,
        isLoading: false,
      });
    };
    const onError = (error) => {
      console.log('handleGetContact', JSON.stringify(error));
      this.setState({
        isLoading: false,
      });
    };

    actionTryCatchCreator({
      service: getAllContactsService(params),
      onPending,
      onSuccess,
      onError,
    });
  };

  render() {
    const { contacts, isLoading, text } = this.state;
    const { onSave, uid } = this.props;
    return (
      <div className='order__info p-3 list_artist_assign'>
        <div className='order__artist'>
          <div className='search mb-3'>
            <input
              type='text'
              placeholder='Search artist'
              value={text}
              onChange={this.handleChangeText}
              className='form-control search__input search__box'
            />
          </div>

          <div className='list mb-3'>
            {isLoading ? (
              <div
                style={{ minHeight: '100px' }}
                className=' d-flex align-items-center justify-content-center'>
                <Spinner />
              </div>
            ) : (
              <div>
                <button
                  onClick={() => onSave({ exId: '' })}
                  key={`list__artist__login`}
                  className={`artist__select `}>
                  <strong className='name'>____Select____</strong>
                  <div className='status'></div>
                </button>
                {contacts.map((cont) => {
                  return (
                    <button
                      onClick={() => onSave(cont)}
                      key={`list__artist__${cont.id}`}
                      className={`artist__select ${
                        cont.exId === uid ? 'active' : ''
                      }`}>
                      <div className='avt'>
                        <img
                          className='w-100 h-100'
                          style={{ objectFit: 'cover' }}
                          src={cont.avatarUrl}
                          alt='contact__author'
                        />
                      </div>

                      <div className='info'>
                        <strong className='name'>
                          {cont?.fullName ||
                            `${cont?.firstName} ${cont?.lastName}`}
                        </strong>
                        <div className='status'>{cont?.source}</div>
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

export default ListContact;
