import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { toast } from 'react-toastify';
import { Form, Spinner, Alert } from 'reactstrap';

import Input from 'components/common/input';
import Button from 'components/common/button';

import { email } from 'utils/validation';

import { updateArtistDetailAction } from 'pages/artist_detail/actions';

const ArtistDetailInfoEdit = (props) => {
  const { ui, errorRequest, handleSubmit, setUpdating, updateArtistDetail } = props;

  const onSubmit = (values) => {
    updateArtistDetail(values, (data) => {
      const successMessage = `[${data.firstName}${data.lastName}] is updated!`;
      toast.dark(successMessage);
      setUpdating(false);
    });
  };

  const handleCancel = () => {
    setUpdating(false);
  };

  return (
    <div className='customer_detail__original customer_detail__form form box'>
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
              &nbsp; {'Save'} &nbsp;
              {ui && ui.loading && <Spinner size='sm' color='light' />}
            </Button>
          </div>

          <div className='box__device' />
          <div className='box__sub_title mb-2'>
            <span className=''>Artist Contact:</span>
          </div>
          <Field className='form__item' component={Input} name='email' placeholder={'Email'} validate={[email]} />
          <Field className='form__item' component={Input} name='phonePrefix' placeholder={'Phone Prefix'} />
          <Field className='form__item' component={Input} name='phoneNumber' placeholder={'Phone Number'} />
          <Field className='form__item' component={Input} name='fbUrl' placeholder={'Facebook'} />
          <Field className='form__item' component={Input} name='igUrl' placeholder={'Instagram'} />
          <Field className='form__item' component={Input} name='uid' placeholder={'Facebook UID'} />

          <div className='box__sub_title mb-2'>
            <span className=''>Payment Info:</span>
          </div>
          <Field className='form__item' component={Input} name='paymentInfo' type='textarea' placeholder={'PaymentInfo'} />

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
              &nbsp; {'Save'} &nbsp;
              {ui && ui.loading && <Spinner size='sm' color='light' />}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ artistDetail }) => {
  const {
    ui,
    data: { artist },
  } = artistDetail;

  return {
    initialValues: { ...artist },
    ui,
  };
};

const mapDispatchToProps = {
  updateArtistDetail: updateArtistDetailAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'artistInfoUpdate',
    enableReinitialize: true,
  })(ArtistDetailInfoEdit),
);
