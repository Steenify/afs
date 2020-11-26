import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { updateComponentFiltersAction } from './actions';

class ComponentFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
  }

  handleChangeText = (e) => {
    const { value } = e.target;
    this.handleSearchTextAPI(value);
  };

  handleSearchTextAPI = (value) => {
    const { updateComponentFiltersAction } = this.props;
    updateComponentFiltersAction({
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
            <input type='text' defaultValue={text} placeholder='Search Components' className='search__box form-control' onChange={this.handleChangeText} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ uiComponents }) => ({
  text: uiComponents.filter.text,
});

const mapDispatchToProps = {
  updateComponentFiltersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentFilters);
