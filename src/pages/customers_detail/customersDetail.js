import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import InPageLoading from 'components/common/inPageLoading';
import PageTitle from 'components/common/PageTitle';

import CustomerDetailInfo from './customersDetailInfo';
import CustomerDetailOrders from './customersDetailOrder';

import { getCustomerDetailAction, getCustomerOrdersAction, resetCustomerDetailAction } from './actions';
import { updateCustomerAction } from 'pages/customers/actions';

const CustomerDetail = (props) => {
  let { login } = useParams();
  const { customer, orders, ui, getCustomerDetailAction, getCustomerOrdersAction, resetCustomerDetailAction } = props;

  useEffect(() => {
    getCustomerDetailAction(login);
    getCustomerOrdersAction(login);
    return resetCustomerDetailAction;
  }, [getCustomerDetailAction, getCustomerOrdersAction, login, resetCustomerDetailAction]);

  return (
    <div className='customer_detail'>
      <PageTitle title={`${customer?.firstName || ''} ${customer?.lastName || ''}`} className='customer_detail__header'></PageTitle>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='customer_detail__wrapper'>
            <CustomerDetailInfo customer={customer} />
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='customer_detail__wrapper'>
            <CustomerDetailOrders orders={orders} />
          </div>
        </div>
      </div>
      <InPageLoading isLoading={ui.loading} />
    </div>
  );
};

const mapStateToProps = ({ customerDetail, role }) => {
  const {
    ui,
    data: { customer, orders },
  } = customerDetail;
  return {
    ui,
    customer,
    orders,
    authorities: role.data.authorities,
  };
};

export default connect(mapStateToProps, {
  getCustomerDetailAction,
  updateCustomerAction,
  getCustomerOrdersAction,
  resetCustomerDetailAction,
})(CustomerDetail);
