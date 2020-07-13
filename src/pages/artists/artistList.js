import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArtistFilters from './artistsFilters';
import ArtistListTable from './artistsListTable';
import ArtistsPaging from './artistsPaging';

import { getArtistsListAction } from './actions';

class ArtistList extends Component {
  componentDidMount() {
    const { getArtistsList } = this.props;
    getArtistsList();
  }
  render() {
    return (
      <div className='artists__page'>
        <div className='artists__header box'>
          <ArtistFilters />
        </div>
        <div className='artists__body'>
          <ArtistListTable />
        </div>
        <div className='artists__paging'>
          <ArtistsPaging />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getArtistsList: getArtistsListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
