import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { useParams } from 'react-router-dom';
import { Form, Spinner, Alert } from 'reactstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Input from 'components/common/input';
import { Select } from 'components/common/select';
import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrowleft.svg';

import { actGetAuthority, actGetAllPermissions, actUpdateAuthority } from './actions';

import { WEB_ROUTES } from 'configs';

const RoleDetail = ({ style, handleSubmit, ...props }) => {
  let { id } = useParams();
  const { ui, errorRequest, permissions, actGetAuthority, actGetAllPermissions } = props;
  const { t } = useTranslation();

  useEffect(() => {
    actGetAuthority(id).then(() => {
      actGetAllPermissions();
    });
  }, [actGetAuthority, actGetAllPermissions, id]);

  const onSubmit = (values) => {
    const params = { ...values };
    params.permissions = [];

    values.permissions.forEach((item) => {
      const index = permissions.findIndex((p) => p.name === item);

      if (index !== -1) {
        params.permissions.push(permissions[index]);
      }
    });

    props.actUpdateAuthority(params).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 200) {
        const successMessage = t('baseApp.authority.updated') + data.name;

        toast.dark(successMessage);
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
    <Layout documentTitle={t('baseApp.authority.home.title')} container fluid>
      <Breadcrumb
        data={[
          {
            title: t('baseApp.authority.home.title'),
            active: false,
            path: '/role',
          },
          {
            title: t('baseApp.authority.detail.title'),
            active: true,
            path: '',
          },
        ]}
      />
      <PageTitle title={t(WEB_ROUTES.USER_ROLE.title)} className='mb-0 mr-3'></PageTitle>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {errorRequest && errorRequest.message && <Alert color='danger'>{errorRequest.message}</Alert>}
        <Field className='form-group--inline' component={Input} name='name' label={t('baseApp.authority.name')} />
        <Field className='form-group--inline form-group--textarea' type='textarea' component={Input} name='description' label={t('baseApp.authority.description')} />
        <Field
          className='form-group--inline'
          component={Select}
          name='permissions'
          label={t('baseApp.authority.permission')}
          multi={true}
          options={permissions.map((item) => ({
            label: item.name,
            value: item.name,
          }))}
        />
        <div className='d-flex'>
          <Button
            tag={Link}
            to='/user/role'
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
            <span className='d-none d-md-inline'>{t('entity.action.back')}</span>
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

const mapStateToProps = ({ role }) => {
  return {
    initialValues: {
      id: role.detail.id,
      name: role.detail.name,
      description: role.detail.description,
      permissions: role.detail.permissions && role.detail.permissions.map((item) => item.name),
    },
    errorRequest: role.error,
    ui: role.ui.edit,
    permissions: role.data.permissions,
  };
};

export default connect(mapStateToProps, {
  actGetAuthority,
  actGetAllPermissions,
  actUpdateAuthority,
})(
  reduxForm({
    form: 'roleUpdate',
    enableReinitialize: true,
  })(RoleDetail),
);
