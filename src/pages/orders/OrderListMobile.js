import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';
import { Spinner } from 'reactstrap';

import { dateTimeFromNow } from 'utils';

import OrderListMobileItem from './OrderListMobileItem';

class OrderListMobile extends PureComponent {
  goToDetail = (code) => {
    const { history } = this.props;
    if (code) {
      history.push(`/order/${code}`);
    }
  };
  render() {
    const { itemGroups, loading } = this.props;
    return (
      <div className={`order__groups `}>
        <div className={`order__loading ${!loading && 'd-none'}`}>
          <Spinner /> <span className='text'>Loading</span>
        </div>
        {map(itemGroups, (group) => (
          <div
            className='group__wrapper'
            key={`order__group__mobile__${group.date}`}>
            <div className='group__title'>{dateTimeFromNow(group.date)}</div>
            <div className='group__list'>
              {map(group.items, (order) => (
                <OrderListMobileItem
                  key={`order__item__mobile__${order}`}
                  data={order}
                  goToDetail={this.goToDetail}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ order, auth }) => ({
  itemGroups: order.list.itemGroups,
  loading: order.ui.list.loading,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(OrderListMobile));
