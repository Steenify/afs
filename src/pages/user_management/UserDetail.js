import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { useParams } from 'react-router-dom';

import { Form, Spinner, Alert, FormGroup, Badge } from 'reactstrap';
import { toast } from 'react-toastify';
import moment from 'moment';

import Input from 'components/common/input';
import { Select } from 'components/common/select';
import Checkbox from 'components/common/checkbox';
import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrowleft.svg';

import { actGetUser, actUpdateUser } from './actions';
import { actGetAuthorities } from 'pages/role_management/actions';

import { WEB_ROUTES } from 'config';

import { useTranslation } from 'react-i18next';

const UserDetail = ({ style, handleSubmit, ...props }) => {
  let { login } = useParams();

  useEffect(() => {
    props.actGetUser(login).then(() => {
      props.actGetAuthorities();
    });
  }, []);

  const { ui, errorRequest, authorities } = props;
  const { t } = useTranslation();

  const selectAuthorities = authorities.filter(
    (item) => item.name !== 'ROLE_CUSTOMER',
  );

  const onSubmit = (values) => {
    console.log('onSubmit -> values', values);

    props.actUpdateUser(values).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 200) {
        const successMessage = t('baseApp.userManagement.updated') + data.login;

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
    <Layout documentTitle={t(WEB_ROUTES.USER_LIST.title)} container fluid>
      <Breadcrumb
        data={[
          {
            title: t('baseApp.userManagement.home.title'),
            active: false,
            path: '/user',
          },
          {
            title: t('baseApp.userManagement.detail.title'),
            active: true,
            path: '',
          },
        ]}
      />
      <PageTitle
        title={t('baseApp.userManagement.detail.title')}
        className='mb-0 mr-3'></PageTitle>

      <Form style={{ marginTop: 27 }} onSubmit={handleSubmit(onSubmit)}>
        {errorRequest && errorRequest.message && (
          <Alert color='danger'>{errorRequest.message}</Alert>
        )}
        <Field
          className='form-group--inline'
          component={Input}
          name='login'
          label={t('baseApp.userManagement.login')}
          disabled
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='email'
          label={t('baseApp.userManagement.email')}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='phoneNumber'
          label={'Phone number'}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='lastName'
          label={t('baseApp.userManagement.lastName')}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='firstName'
          label={t('baseApp.userManagement.firstName')}
        />
        <Field
          className='form-group--inline form-group--role'
          component={Select}
          name='authorities'
          label={t('baseApp.userManagement.role')}
          multi={true}
          options={selectAuthorities.map((item) => ({
            label: item.name,
            value: item.name,
            desc: item.name,
          }))}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='customerExtension.note'
          label={'Note'}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='customerExtension.fbChat'
          label={'Facebook Chat'}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='customerExtension.mailChain'
          label={'Mail Chain'}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='customerExtension.fbUrl'
          label={'Facebook Url'}
        />

        <Field
          className='form-group--inline'
          component={Input}
          name='customerExtension.igUrl'
          label={'Instagram Url'}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='customerExtension.linkedUrl'
          label={'LinkedIn Url'}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='customerExtension.snapChatUrl'
          label={'SnapChat Url'}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='customerExtension.twitterUrl'
          label={'Twitter Url'}
        />

        <Field
          className='form-group--inline'
          component={Input}
          name='customerExtension.gen'
          label={'Gender'}
        />

        <FormGroup className='form-group--inline'>
          <label>{t('baseApp.userManagement.status')}</label>
          <Field
            className='form-check--hide-input'
            component={Checkbox}
            name='activated'
            labelActive={
              <Badge color='success' pill>
                {t('baseApp.userManagement.activated')}
              </Badge>
            }
            labelUnActive={
              <Badge color='danger' pill>
                {t('baseApp.userManagement.deactivated')}
              </Badge>
            }
          />
        </FormGroup>
        <div className='form-group--inline'>
          <label>{t('baseApp.userManagement.createdDate')}</label>
          <div style={{ paddingTop: 11 }}>
            {props.initialValues.createdDate &&
              moment(props.initialValues.createdDate).format(
                'DD/MM/YYYY HH:mm',
              )}
          </div>
        </div>
        <div className='d-flex'>
          <Button
            tag={Link}
            to='/user'
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

const mapStateToProps = ({ user, role, global }) => {
  return {
    initialValues: {
      login: user.detail.login,
      firstName: user.detail.firstName,
      lastName: user.detail.lastName,
      id: user.detail.id,
      activated: user.detail.activated,
      authorities: user.detail.authorities,
      createdBy: user.detail.createdBy,
      createdDate: user.detail.createdDate,
      email: user.detail.email,
      imageUrl: user.detail.imageUrl,
      langKey: user.detail.langKey,
      lastModifiedBy: user.detail.lastModifiedBy,
      lastModifiedDate: user.detail.lastModifiedDate,
      permissions: user.detail.permissions,
    },
    errorRequest: user.error,
    ui: user.ui.edit,
    authorities: role.data.authorities,
    lang: global.data.lang,
  };
};

export default connect(mapStateToProps, {
  actGetUser,
  actUpdateUser,
  actGetAuthorities,
})(
  reduxForm({
    form: 'userUpdate',
    enableReinitialize: true,
  })(UserDetail),
);
