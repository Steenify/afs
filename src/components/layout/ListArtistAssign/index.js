import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { debounce } from 'lodash';

import { getAssignArtistsService } from 'services/artist';

import { actionTryCatchCreator } from 'utils';

import './style.scss';

class ListArtists extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      artists: [],
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
      text,
    };

    const onPending = () => {
      this.setState({
        isLoading: true,
      });
    };
    const onSuccess = (data) => {
      this.setState({
        artists: data,
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
      service: getAssignArtistsService(params),
      onPending,
      onSuccess,
      onError,
    });
  };

  render() {
    const { artists, isLoading, text } = this.state;
    const { onSave, assignedTo } = this.props;
    return (
      <div className='order__info p-3 list_artist_assign'>
        <div className='order__artist'>
          <div className='search mb-3'>
            <input type='text' placeholder='Search artist' value={text} onChange={this.handleChangeText} className='form-control search__input search__box' />
          </div>

          <div className='list mb-3'>
            {isLoading ? (
              <div style={{ minHeight: '100px' }} className=' d-flex align-items-center justify-content-center'>
                <Spinner />
              </div>
            ) : (
              <div>
                {artists.map((art) => {
                  const doing = (art?.numNewOrder || 0) + (art?.numSketch || 0) + (art?.numSketchEdit || 0) + (art?.numColorEdit || 0) + (art?.numColor || 0);
                  const reviewing = (art?.numSketchReview || 0) + (art?.numColorReview || 0) + (art?.numExportFile || 0);
                  return (
                    <button onClick={() => onSave(art)} key={`list__artist__${art.login}`} className={`artist__select ${art.login === assignedTo?.login ? 'active' : ''}`}>
                      <div className='avt'>
                        <img src={`https://ui-avatars.com/api/?name=${art?.fullName || ''}${art?.firstName || ''}${art?.lastName || ''}`} alt='comments__author' />
                      </div>

                      <div className='info'>
                        <strong className='name'>{art?.fullName || `${art?.firstName} ${art?.lastName}`}</strong>
                        <div className='status'>
                          {art.note && <div className='note text-break'>{`${art.note}`}</div>}
                          <div className='currProgress'>
                            Doing: {doing}, Reviewing: {reviewing}
                          </div>
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
