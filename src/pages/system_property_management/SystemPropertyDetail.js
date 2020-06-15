import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { useParams } from 'react-router-dom';
import { Form, Spinner, Alert } from 'reactstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Input from 'components/common/input';
// import { Select } from 'components/common/select';
import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrowleft.svg';

import { actGetSystemProperty, actUpdateSystemProperty } from './actions';

import { WEB_ROUTES } from 'config';

const SystemPropertyDetail = ({ style, handleSubmit, ...props }) => {
  let { id } = useParams();
  const { ui, errorRequest } = props;
  const { t } = useTranslation();

  useEffect(() => {
    props.actGetSystemProperty(id);
  }, []);

  const onSubmit = (values) => {
    props.actUpdateSystemProperty(values).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 200) {
        const successMessage =
          t('baseApp.systemProperties.updated') + data.name;

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
      documentTitle={t(WEB_ROUTES.SYSTEM_PROPERTY_DETAIL.title)}
      container
      fluid>
      <Breadcrumb
        data={[
          {
            title: t('baseApp.systemProperties.home.title'),
            active: false,
            path: '/system-property',
          },
          {
            title: t('baseApp.systemProperties.detail.title'),
            active: true,
            path: '',
          },
        ]}
      />
      <PageTitle
        title={t(WEB_ROUTES.SYSTEM_PROPERTY_DETAIL.title)}
        className='mb-0 mr-3'></PageTitle>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 27 }}>
        {errorRequest && errorRequest.message && (
          <Alert color='danger'>{errorRequest.message}</Alert>
        )}
        <Field
          className='form-group--inline'
          component={Input}
          name='name'
          label={t('baseApp.systemProperties.name')}
          disabled
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='value'
          label={t('baseApp.systemProperties.value')}
          disabled={!props.isEditable}
        />
        <div className='d-flex'>
          <Button
            tag={Link}
            to='/system-property'
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
          {props.isEditable && (
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
          )}
        </div>
      </Form>
    </Layout>
  );
};

const mapStateToProps = ({ systemProperty }) => {
  return {
    initialValues: {
      id: systemProperty.detail.id,
      name: systemProperty.detail.name,
      type: systemProperty.detail.type,
      value: systemProperty.detail.value,
      isEditable: systemProperty.detail.isEditable,
    },
    isEditable: systemProperty.detail.isEditable,
    errorRequest: systemProperty.error,
    ui: systemProperty.ui.edit,
  };
};

export default connect(mapStateToProps, {
  actGetSystemProperty,
  actUpdateSystemProperty,
})(
  reduxForm({
    form: 'systemPropertyUpdate',
    enableReinitialize: true,
  })(SystemPropertyDetail),
);
