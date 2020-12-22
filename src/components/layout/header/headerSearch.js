import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { debounce, get } from 'lodash';
import { Spinner } from 'reactstrap';

import { getAllOrdersService } from 'services/order';
import { actionTryCatchCreator, getSelectedStatus, dateTimeToDeadline } from 'utils';

import { WEB_ROUTES } from 'configs';

class HeaderSearch extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      key: '',
      loading: false,
      isShow: false,
    };

    this.handleSearch = debounce(this.handleSearch, 300);
  }
  handleSearch = () => {
    const { key } = this.state;

    const params = {
      text: key,
      size: 10,
      page: 0,
      sort: 'number,desc',
    };

    const onPending = () => {
      this.setState({
        loading: true,
      });
    };
    const onSuccess = (data) => {
      this.setState({
        results: data,
        loading: false,
      });
    };
    const onError = (error) => {
      console.log('HeaderSearch ', JSON.stringify(error));
      this.setState({
        loading: false,
      });
    };

    actionTryCatchCreator({
      service: getAllOrdersService(params),
      onPending,
      onSuccess,
      onError,
    });
  };
  handleChangeKeyword = (e) => {
    e.preventDefault();
    const { value } = e.target;

    this.setState(
      {
        key: value,
        loading: true,
      },
      this.handleSearch,
    );
  };

  hanldeFocus = () => {
    this.setState({
      isShow: true,
    });
  };

  handleBlur = () => {
    setTimeout(() => {
      this.setState({
        isShow: false,
      });
    }, 300);
  };

  render() {
    const { statuses } = this.props;
    const { key, results, isShow, loading } = this.state;
    return (
      <div className='header__search search'>
        <input
          type='text'
          onFocus={this.hanldeFocus}
          onBlur={this.handleBlur}
          placeholder='Search'
          value={key}
          onChange={this.handleChangeKeyword}
          className='search__box form-control search__input'
        />
        <div className='search__floating'>
          <div className={`search__results ${isShow && 'show'}`}>
            {loading ? (
              <div className='search__loading'>
                <Spinner />
              </div>
            ) : (
              results.map((res) => (
                <div key={`search__results__item__${res.id}`} className='search__result result'>
                  <Link className='search__wrapper' to={`${WEB_ROUTES.ORDERS_DETAIL.path.replace(':id', res.code)}`}>
                    <div className='result__number result__col'>#{res?.number}</div>
                    <div className='result__date result__col'>{dateTimeToDeadline(res?.paidAt)}</div>
                    <div className='result__customer result__col'>{res?.customer?.fullName}</div>
                    <div className='result__artist result__col'>{res?.assignedTo?.fullName || 'Not Assigned'}</div>
                    <div className='result__status result__col'>
                      <div className={`order__status cursor-pointer ${getSelectedStatus(res?.status, statuses).name}`}>{getSelectedStatus(res?.status, statuses).friendlyName}</div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  const statuses = get(reducers, `orderTable.orders.status`) || [];
  return {
    statuses,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch);
