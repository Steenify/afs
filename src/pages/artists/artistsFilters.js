import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { updateArtistFilterAction, getArtistsListAction } from './actions';

class ArtistFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
  }

  handleChangeText = (e) => {
    const { updateArtistFilter } = this.props;
    const { value } = e.target;
    updateArtistFilter({
      text: value,
      page: 0,
    });

    this.handleSearchTextAPI();
  };

  handleSearchTextAPI = () => {
    const { getArtistsList } = this.props;
    getArtistsList({});
  };

  render() {
    const { text } = this.props;

    return (
      <div className='payouts__filters'>
        <div className='filter__main'>
          <div className='filter__text'>
            <input
              type='text'
              value={text}
              placeholder='Search Artists'
              className='search__box form-control'
              onChange={this.handleChangeText}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ artists, auth }) => {
  return {
    text: artists.filter.text,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  updateArtistFilter: updateArtistFilterAction,
  getArtistsList: getArtistsListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistFilters);
