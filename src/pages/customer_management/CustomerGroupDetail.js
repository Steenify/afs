import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Form, Spinner, Alert } from 'reactstrap';

import Input from 'components/common/input';
import { Select } from 'components/common/select';
import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrowleft.svg';

import {
  actGetCustomerGroup,
  actGetCustomers,
  actUpdateCustomerGroup,
} from './actions';

import { WEB_ROUTES } from 'config';

const CustomerGroupDetail = ({ style, handleSubmit, ...props }) => {
  let { id } = useParams();
  const { ui, errorRequest, customers } = props;
  const { t } = useTranslation();

  useEffect(() => {
    props.actGetCustomerGroup(id).then(() => {
      // Get list of customer
      props.actGetCustomers();
    });
  }, []);

  const onSubmit = (values) => {
    const params = { ...values };
    params.users = [];

    values.users.forEach((item) => {
      const index = customers.findIndex((c) => c.id == item);
      if (index !== -1) {
        params.users.push(customers[index]);
      }
    });

    props.actUpdateCustomerGroup(params).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 200) {
        const successMessage = t('baseApp.customerGroup.updated') + data.name;

        toast.success(successMessage);
      } else {
        let errorMessage = '';
        if (errorKey) {
          const key = 'error.' + errorKey;
          errorMessage = t(key);
        } else {
          if (status) {
            const key = 'error.http.' + status;
            errorMessage = t(key);
          } else {
            errorMessage = message;
          }
        }

        toast.error(errorMessage || message);
      }
    });
  };

  return (
    <Layout
      documentTitle={t(WEB_ROUTES.CUSTOMER_GROUP_DETAIL.title)}
      container
      fluid>
      <Breadcrumb
        data={[
          {
            title: t('baseApp.customerGroup.home.title'),
            active: false,
            path: '/customer-group',
          },
          {
            title: t('baseApp.customerGroup.detail.title'),
            active: true,
            path: '',
          },
        ]}
      />
      <PageTitle
        title={t(WEB_ROUTES.CUSTOMER_GROUP_DETAIL.title)}
        className='mb-0 mr-3'></PageTitle>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 27 }}>
        {errorRequest && errorRequest.message && (
          <Alert color='danger'>{errorRequest.message}</Alert>
        )}
        <Field
          className='form-group--inline'
          component={Input}
          name='name'
          label={t('baseApp.customerGroup.name')}
        />
        <Field
          className='form-group--inline form-group--textarea'
          type='textarea'
          component={Input}
          name='description'
          label={t('baseApp.customerGroup.description')}
        />
        <Field
          className='form-group--inline'
          component={Select}
          name='users'
          label={t('baseApp.customerGroup.customer')}
          multi={true}
          options={customers.map((item) => ({
            label: item.firstName + ' ' + item.lastName,
            value: item.id,
          }))}
        />
        <div className='d-flex'>
          <Button
            tag={Link}
            to='/customer-group'
            replace
            style={{
              height: 38,
              display: 'inline-flex',
              alignItems: 'center',
              marginTop: 24,
              minWidth: 86,
              marginRight: 10,
            }}>
            <ArrowLeftIcon />
            &nbsp;
            <span className='d-none d-md-inline'>
              {t('entity.action.back')}
            </span>
          </Button>
          &nbsp;
          <Button
            color='primary'
            type='submit'
            style={{
              height: 38,
              display: 'inline-flex',
              alignItems: 'center',
              minWidth: 110,
              marginTop: 24,
              justifyContent: 'center',
            }}>
            &nbsp; {t('entity.action.save')} &nbsp;
            {ui && ui.loading && <Spinner size='sm' color='light' />}
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

const mapStateToProps = ({ customer }) => {
  return {
    initialValues: {
      id: customer.detailGroup.id,
      name: customer.detailGroup.name,
      description: customer.detailGroup.description,
      users:
        customer.detailGroup.users &&
        customer.detailGroup.users.map((item) => item.id),
    },
    customers: customer.data.customers,
  };
};

export default connect(mapStateToProps, {
  actGetCustomerGroup,
  actGetCustomers,
  actUpdateCustomerGroup,
})(
  reduxForm({
    form: 'customerGroupUpdate',
    enableReinitialize: true,
  })(CustomerGroupDetail),
);
