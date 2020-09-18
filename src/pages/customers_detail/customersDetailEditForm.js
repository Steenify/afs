import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { toast } from 'react-toastify';
import { Form, Spinner, Alert } from 'reactstrap';

import Input from 'components/common/input';
import Button from 'components/common/button';
import { Select } from 'components/common/select';

import { updateCustomerDetailAction } from 'pages/customers_detail/actions';

import { email } from 'utils/validation';

const CustomerDetailEditForm = (props) => {
  const { ui, errorRequest, handleSubmit, setUpdating, updateCustomerDetail } = props;

  const onSubmit = (values) => {
    updateCustomerDetail(values, (data) => {
      const successMessage = `[${data.firstName}${data.lastName}] is updated!`;
      toast.dark(successMessage);
      setUpdating(false);
    });
  };

  const handleCancel = () => {
    setUpdating(false);
  };

  return (
    <div className='customer_detail__original customer_detail__box customer_detail__form form box'>
      <div className='box__body'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errorRequest && errorRequest.message && <Alert color='danger'>{errorRequest.message}</Alert>}

          <div className='d-flex justify-content-between mb-2'>
            <Button
              onClick={handleCancel}
              style={{
                height: 38,
                display: 'inline-flex',
                alignItems: 'center',
                minWidth: 86,
                marginRight: 10,
              }}>
              Cancel
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
                justifyContent: 'center',
              }}>
              &nbsp; {'save'} &nbsp;
              {ui && ui.loading && <Spinner size='sm' color='light' />}
            </Button>
          </div>

          <div className='box__device' />
          <div className='box__sub_title mb-2'>
            <span className=''>Customer Info:</span>
          </div>
          <div className='row'>
            <div className='col-6'>
              <Field className='form__item' component={Input} name='firstName' placeholder={'First Name'} />
            </div>
            <div className='col-6'>
              <Field className='form__item' component={Input} name='lastName' placeholder={'Last Name'} />
            </div>
          </div>
          <Field className='form__item' component={Input} name='customerExtension.note' type='textarea' placeholder={'Note'} />
          <Field className='form__item' component={Input} name='email' placeholder='Email' validate={[email]} />
          <Field className='form__item' component={Input} name='phoneNumber' placeholder='Phone Number' />

          <div className='box__device' />
          <div className='box__sub_title mb-2'>
            <span className=''>Customer Contact:</span>
          </div>
          <Field className='form__item' component={Input} name='customerExtension.fbChat' placeholder={'Facebook Chat'} />
          <Field className='form__item' component={Input} name='customerExtension.mailChain' placeholder={'Mail Chain'} />
          <Field className='form__item' component={Input} name='customerExtension.fbUrl' placeholder={'Facebook Url'} />
          <Field className='form__item' component={Input} name='customerExtension.fbUrl2' placeholder={'Facebook Url 2'} />
          <Field className='form__item' component={Input} name='customerExtension.igUrl' placeholder={'Instagram Url'} />
          <Field className='form__item' component={Input} name='customerExtension.igUrl2' placeholder={'Instagram igUrl 2'} />
          <Field className='form__item' component={Input} name='customerExtension.linkedUrl' placeholder={'LinkedIn Url'} />
          <Field className='form__item' component={Input} name='customerExtension.snapChatUrl' placeholder={'SnapChat Url'} />
          <Field className='form__item' component={Input} name='customerExtension.twitterUrl' placeholder={'Twitter Url'} />

          <div className='box__device' />
          <div className='box__sub_title mb-2'>
            <span className=''>Customer Address:</span>
          </div>

          <Field className='form__item' component={Input} name='customerExtension.address1' placeholder={'Address'} />
          <Field className='form__item' component={Input} name='customerExtension.address2' placeholder={'Apartment, suite, etc. (optional)'} />
          <Field className='form__item' component={Input} name='customerExtension.company' placeholder={'Company'} />
          <Field className='form__item' component={Input} name='customerExtension.city' placeholder={'City'} />
          <Field className='form__item' component={Input} name='customerExtension.country' placeholder={'Country'} />
          <Field className='form__item' component={Input} name='customerExtension.zip' placeholder={'Zip'} />

          <div className='box__device' />
          <div className='box__sub_title mb-2'>
            <span className=''>More Info:</span>
          </div>

          <Field
            className='form__item'
            component={Select}
            name='customerExtension.gen'
            options={[
              { label: 'SELECT GENDER', value: '', desc: '' },
              { label: 'MALE', value: 'MALE', desc: '' },
              { label: 'FEMALE', value: 'FEMALE', desc: '' },
            ]}
          />
          <Field className='form__item' component={Input} name='customerExtension.dob' placeholder={'Day of Birth'} />
          <Field className='form__item' component={Input} name='customerExtension.age' placeholder={'Age'} />

          <div className='d-flex justify-content-between mt-4'>
            <Button
              onClick={handleCancel}
              style={{
                height: 38,
                display: 'inline-flex',
                alignItems: 'center',
                minWidth: 86,
                marginRight: 10,
              }}>
              Cancel
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
                justifyContent: 'center',
              }}>
              &nbsp; {'save'} &nbsp;
              {ui && ui.loading && <Spinner size='sm' color='light' />}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ customerDetail }) => {
  const {
    ui,
    data: { customer },
  } = customerDetail;
  return {
    initialValues: { ...customer },
    ui,
  };
};

const mapDispatchToProps = {
  updateCustomerDetail: updateCustomerDetailAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'customerUpdate',
    enableReinitialize: true,
  })(CustomerDetailEditForm),
);
