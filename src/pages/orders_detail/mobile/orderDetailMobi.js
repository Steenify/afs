import React from 'react';
import { connect } from 'react-redux';

import Navigation from 'components/layout/navigation';

import { ReactComponent as Search } from 'assets/img/search_navigation.svg';

import './style_mobi.scss';
import button from 'components/common/button';

const orderDetailMobi = () => {
  const RightButton = () => (
    <button type='button'>
      <span className='icon'>
        <Search />
      </span>
    </button>
  );

  return (
    <div className='order_detail_mobi'>
      <Navigation title='laksld' RightButton={RightButton} />
    </div>
  );
};

const mapStateToProps = ({ orderDetail, orderTable, auth }) => {
  return {
    loading: orderDetail.ui.loading,
    order: orderDetail.data.order,
    status: orderTable.orders.status,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(orderDetailMobi);
