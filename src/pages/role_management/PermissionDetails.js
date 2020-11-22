import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { useParams } from 'react-router-dom';
import { Form, Spinner, Alert } from 'reactstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Input from 'components/common/input';
import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrowleft.svg';

import { actGetPermission, actUpdatePermission } from './actions';
import { required } from 'utils/validation';

import { WEB_ROUTES } from 'configs';

const PermissionDetail = ({ style, handleSubmit, actGetPermission, ...props }) => {
  let { id } = useParams();
  const { ui, errorRequest } = props;
  const { t } = useTranslation();

  useEffect(() => {
    actGetPermission(id);
  }, [id, actGetPermission]);

  const onSubmit = (values) => {
    const params = { ...values };

    props.actUpdatePermission(params).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 200) {
        const successMessage = t('baseApp.permission.updated') + data.name;

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
    <Layout documentTitle={t(WEB_ROUTES.USER_PERMISSION.title)} container fluid>
      <Breadcrumb
        data={[
          {
            title: t('baseApp.permission.home.title'),
            active: false,
            path: '/permission',
          },
          {
            title: t('baseApp.permission.detail.title'),
            active: true,
            path: '',
          },
        ]}
      />
      <PageTitle title={t(WEB_ROUTES.USER_PERMISSION.title)} className='mb-0 mr-3'></PageTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {errorRequest && errorRequest.message && <Alert color='danger'>{errorRequest.message}</Alert>}
        <Field className='form-group--inline' component={Input} name='name' label={t('baseApp.permission.name')} validate={[required]} />
        <Field className='form-group--inline' type='textarea' component={Input} name='description' label={t('baseApp.permission.description')} />
        <Field className='form-group--inline' component={Input} name='permissionGroup' label={t('baseApp.permission.permissionGroup')} />
        <div className='d-flex'>
          <Button
            tag={Link}
            to='/user/permission'
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
      id: role.permissionDetail.id,
      name: role.permissionDetail.name,
      description: role.permissionDetail.description,
      permissionGroup: role.permissionDetail.permissionGroup,
    },
    errorRequest: role.error,
    ui: role.ui.edit,
  };
};

export default connect(mapStateToProps, {
  actGetPermission,
  actUpdatePermission,
})(
  reduxForm({
    form: 'permissionUpdate',
    enableReinitialize: true,
  })(PermissionDetail),
);
