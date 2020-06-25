import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Form, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Input from 'components/common/input';
import Button from 'components/common/button';
import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';
import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrowleft.svg';

import { actChangePassword } from './actions';

const ChangePassword = ({ style, handleSubmit, ...props }) => {
  const { t } = useTranslation();

  const onSubmit = (values) => {
    props.actChangePassword(values).then((res) => {
      const { status, data } = res;
      const { errorKey, message, title } = data;

      if (status === 200) {
        toast.dark('Success Notification !');

        props.reset();
      } else {
        let errorMessage = '';
        if (errorKey) {
          const key = 'global:error.' + errorKey;
          errorMessage = t(key);
        } else {
          if (status) {
            const key = 'error:error.http.' + status;
            errorMessage = t(key);
          } else {
            errorMessage = message;
          }
        }

        toast.error(errorMessage || message);
      }
    });
  };

  const { ui } = props;

  return (
    <Layout documentTitle='Change Password' container fluid>
      <Breadcrumb
        data={[
          { title: 'Change Password', active: false, path: '/change-password' },
        ]}
      />
      <PageTitle title='Change Password' className='mb-0 mr-3'></PageTitle>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 27 }}>
        <Field
          className='form-group--inline'
          component={Input}
          name='currentPassword'
          label='Current Password'
          type='password'
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='newPassword'
          label='New Password'
          type='password'
        />
        <div className='d-flex'>
          <Button
            tag={Link}
            to='/'
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
            <span className='d-none d-md-inline'>Back</span>
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
            &nbsp; Save &nbsp;
            {ui && ui.loading && <Spinner size='sm' color='light' />}
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    ui: auth.ui.changePassword,
  };
};

export default connect(mapStateToProps, { actChangePassword })(
  reduxForm({
    form: 'changePassword',
    enableReinitialize: true,
  })(ChangePassword),
);
