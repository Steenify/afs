import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Form, Spinner, Alert } from 'reactstrap';
import { ReactComponent as Logo } from 'assets/img/logo.svg';
import Input from 'components/common/input';
import Checkbox from 'components/common/checkbox';
import Button from 'components/common/button';

import './style.scss';

import { actSignin } from './actions';

import { required, minValue } from 'utils/validation';

const minValue4 = minValue(4);

const Signin = ({ style, handleSubmit, ...props }) => {
  const onSubmit = (values) => {
    props.actSignin(values);
  };

  const { ui, errorRequest } = props;

  return (
    <div className='d-flex align-items-center min-vh-100'>
      <Form className='form-signin' onSubmit={handleSubmit(onSubmit)}>
        <div className='text-center mb-4'>
          <Logo width='80px' height='80px' className='logo' />
          <h1 className='h5 my-3 font-weight-normal'>Art Fulfillment System</h1>
        </div>

        {errorRequest && errorRequest.message && (
          <Alert color='danger'>{errorRequest.message}</Alert>
        )}

        <Field
          className='...'
          component={Input}
          name='username'
          label='Username'
          validate={[required]}
        />

        <Field
          className='...'
          component={Input}
          name='password'
          label='Password'
          type='password'
          validate={[required, minValue4]}
        />

        <Field
          className='...'
          component={Checkbox}
          name='rememberMe'
          label='Remember Me'
        />

        <Button
          className='mt-3 btn-block justify-content-center'
          type='submit'
          color='primary'>
          Sign in &nbsp;
          {ui && ui.loading && <Spinner size='sm' color='light' />}
        </Button>

        <p className='mt-5 mb-3 text-muted text-center'>
          &copy; 2020 – Steenify. All rights reserved.
        </p>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    initialValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    ui: auth.ui,
    errorRequest: auth.error,
  };
};

export default connect(mapStateToProps, { actSignin })(
  reduxForm({
    form: 'singin',
    enableReinitialize: true,
  })(Signin),
);
