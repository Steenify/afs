import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Spinner, FormGroup, Badge } from 'reactstrap';
import { toast } from 'react-toastify';

import Input from 'components/common/input';
import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import Checkbox from 'components/common/checkbox';
import Button from 'components/common/button';
import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrowleft.svg';

import { getArtistAction, updateArtistDetailApiAction } from './actions';

import { WEB_ROUTES } from 'configs';

const ArtistDetail = ({ style, handleSubmit, ...props }) => {
  const { login } = useParams();
  const { ui, getArtist, updateArtistDetailApi, history } = props;

  useEffect(() => {
    getArtist(login);
  }, [login, getArtist]);

  const { t } = useTranslation();

  const onSubmit = (values) => {
    const payload = {
      artistExtension: {
        fbUrl: values?.fbUrl,
        igUrl: values?.igUrl,
        note: values?.note,
        uid: values?.uid,
        productQualityScore: values?.productQualityScore,
        workingSpeedScore: values?.workingSpeedScore,
        workingAttitudeScore: values?.workingAttitudeScore,
      },
      login: values?.login,
      email: values?.email,
      firstName: values?.firstName,
      lastName: values?.lastName,
      phoneNumber: values?.phoneNumber,
      id: values?.id,
      activated: values?.activated,
    };

    updateArtistDetailApi(payload, () => {
      toast.dark('Artist Updated!');
    });
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Layout documentTitle={WEB_ROUTES.ARTISTS_DETAIL.title} container fluid>
      <div className='d-flex mt-2 mb-3'>
        <Button className='artists__back' tag={Link} color='link' to={WEB_ROUTES.ARTISTS.path} replace>
          <ArrowLeftIcon />
          &nbsp; &nbsp;
          <span className='d-none d-md-inline'>{WEB_ROUTES.ARTISTS.title}</span>
        </Button>
      </div>

      <PageTitle title={WEB_ROUTES.ARTISTS_DETAIL.title} className='mb-0 mr-3'></PageTitle>

      <Form style={{ marginTop: 27 }} onSubmit={handleSubmit(onSubmit)}>
        <Field className='form-group--inline' component={Input} name='login' label={t('baseApp.userManagement.login')} disabled />

        <Field className='form-group--inline' component={Input} name='email' label={t('baseApp.customerManagement.email')} />
        <Field className='form-group--inline' component={Input} name='phoneNumber' label={t('baseApp.customerManagement.phoneNumber')} />
        <Field className='form-group--inline' component={Input} name='lastName' label={t('baseApp.customerManagement.lastName')} />
        <Field className='form-group--inline' component={Input} name='firstName' label={t('baseApp.customerManagement.firstName')} />

        <Field className='form-group--inline' component={Input} name='note' label={'Note'} />

        <Field className='form-group--inline' component={Input} name='fbUrl' label={'Facebook Url'} />

        <Field className='form-group--inline' component={Input} name='igUrl' label={'Instagram Url'} />
        <Field className='form-group--inline' component={Input} name='uid' label={'Contact UID'} />
        <Field className='form-group--inline' component={Input} name='productQualityScore' label={'Quality Score'} />
        <Field className='form-group--inline' component={Input} name='workingSpeedScore' label={'Speed Score'} />
        <Field className='form-group--inline' component={Input} name='workingAttitudeScore' label={'Attitude Score'} />

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
            onClick={handleBack}
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
            {ui && ui.loadingDetail && <Spinner size='sm' color='light' />}
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

const mapStateToProps = ({ role, artists }) => {
  return {
    initialValues: artists.artist,
    ui: artists.ui,
    authorities: role.data.authorities,
  };
};

const mapDispatchToProps = {
  getArtist: getArtistAction,
  updateArtistDetailApi: updateArtistDetailApiAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'artistUpdate',
    enableReinitialize: true,
  })(ArtistDetail),
);
