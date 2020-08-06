import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import InPageLoading from 'components/common/inPageLoading';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';

import CustomerDetailInfo from './customersDetailInfo';
import CustomerDetailOrders from './customersDetailOrder';

import { getCustomerDetailAction, getCustomerOrdersAction, resetCustomerDetailAction } from './actions';
import { updateCustomerAction } from 'pages/customers/actions';

import { WEB_ROUTES } from 'configs';

const CustomerDetail = (props) => {
  let { login } = useParams();
  let history = useHistory();
  const { t } = useTranslation();
  const { customer, orders, ui, getCustomerDetailAction, getCustomerOrdersAction, resetCustomerDetailAction } = props;

  useEffect(() => {
    getCustomerDetailAction(login);
    getCustomerOrdersAction(login);
    return resetCustomerDetailAction;
  }, [getCustomerDetailAction, getCustomerOrdersAction, login, resetCustomerDetailAction]);

  if (isEmpty(customer)) {
    return <InPageLoading isLoading={ui.loading} />;
  }

  const goToEdit = () => {
    const url = WEB_ROUTES.CUSTOMER_DETAIL_EDIT.path.replace(':login', customer.login);
    history.push(url);
  };

  return (
    <div className='customer_detail'>
      <PageTitle title={`${customer.firstName || ''} ${customer.lastName || ''}`} className='customer_detail__header'>
        <div className='ml-auto'>
          <Button color='primary' onClick={goToEdit} className='btn-create'>
            {t('baseApp.customerManagement.detail.edit')}
          </Button>
        </div>
      </PageTitle>
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
