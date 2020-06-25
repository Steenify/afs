import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Form, Spinner, Alert, Badge, FormGroup } from 'reactstrap';

import Input from 'components/common/input';
import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import Checkbox from 'components/common/checkbox';
import Button from 'components/common/button';
import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrowleft.svg';

import { getArtistAction } from './actions';

import { WEB_ROUTES } from 'config';

const ArtistDetail = ({ style, handleSubmit, ...props }) => {
  const { login } = useParams();
  const { ui, errorRequest, getArtist } = props;

  useEffect(() => {
    getArtist(login);
  }, []);

  const { t } = useTranslation();

  const onSubmit = (values) => {
    props.actUpdateCustomer(values).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 200) {
        const successMessage =
          t('baseApp.customerManagement.updated') + ' ' + data.login;

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
    <Layout documentTitle={WEB_ROUTES.ARTISTS_DETAIL.title} container fluid>
      <div className='d-flex mt-2 mb-3'>
        <Button
          className='artists__back'
          tag={Link}
          color='link'
          to={WEB_ROUTES.ARTISTS.path}
          replace>
          <ArrowLeftIcon />
          &nbsp; &nbsp;
          <span className='d-none d-md-inline'>{WEB_ROUTES.ARTISTS.title}</span>
        </Button>
      </div>

      <PageTitle
        title={WEB_ROUTES.ARTISTS_DETAIL.title}
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
          label={t('baseApp.customerManagement.email')}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='phoneNumber'
          label={t('baseApp.customerManagement.phoneNumber')}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='lastName'
          label={t('baseApp.customerManagement.lastName')}
        />
        <Field
          className='form-group--inline'
          component={Input}
          name='firstName'
          label={t('baseApp.customerManagement.firstName')}
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
          <label>Status</label>
          <Field
            className='form-check--hide-input'
            component={Checkbox}
            name='activated'
            labelActive={
              <Badge color='success' pill>
                {t('baseApp.customerManagement.activated')}
              </Badge>
            }
            labelUnActive={
              <Badge color='danger' pill>
                {t('baseApp.customerManagement.deactivated')}
              </Badge>
            }
          />
        </FormGroup>
        <div className='d-flex'>
          <Button
            tag={Link}
            to='/customer'
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

const mapStateToProps = ({ customer, role, artists }) => {
  return {
    initialValues: {
      login: artists.artist.login,
      firstName: artists.artist.firstName,
      lastName: artists.artist.lastName,
      id: artists.artist.id,
      activated: artists.artist.activated,
      authorities: artists.artist.authorities,
      createdBy: artists.artist.createdBy,
      createdDate: artists.artist.createdDate,
      email: artists.artist.email,
      imageUrl: artists.artist.imageUrl,
      langKey: artists.artist.langKey,
      lastModifiedBy: artists.artist.lastModifiedBy,
      lastModifiedDate: artists.artist.lastModifiedDate,
      permissions: artists.artist.permissions,
      phoneNumber: artists.artist.phoneNumber,
      customerExtension: artists.artist.customerExtension,
    },
    errorRequest: customer.error.edit,
    ui: customer.ui.edit,
    authorities: role.data.authorities,
  };
};

export default connect(mapStateToProps, {
  getArtist: getArtistAction,
})(
  reduxForm({
    form: 'artistUpdate',
    enableReinitialize: true,
  })(ArtistDetail),
);
