import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { toast } from 'react-toastify';
import { Form, Spinner, Alert } from 'reactstrap';

import Input from 'components/common/input';
import Button from 'components/common/button';
import { Select } from 'components/common/select';

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
            <span className=''>Artist Info:</span>
          </div>
          <div className='row'>
            <div className='col-6'>
              <Field className='form__item' component={Input} name='firstName' placeholder={'First Name'} />
            </div>
            <div className='col-6'>
              <Field className='form__item' component={Input} name='lastName' placeholder={'Last Name'} />
            </div>
          </div>
          <Field className='form__item' component={Input} name='note' type='textarea' placeholder={'Note'} />
          <div className='box__sub_title mb-2'>
            <span className=''>Quality Score:</span>
          </div>
          <Field
            className='form__item'
            component={Select}
            name='productQualityScore'
            options={[
              { label: 'SELECT', value: 0, desc: '' },
              { label: '1', value: 1, desc: '' },
              { label: '2', value: 2, desc: '' },
              { label: '3', value: 3, desc: '' },
              { label: '4', value: 4, desc: '' },
              { label: '5', value: 5, desc: '' },
              { label: '6', value: 6, desc: '' },
              { label: '7', value: 7, desc: '' },
              { label: '8', value: 8, desc: '' },
              { label: '9', value: 9, desc: '' },
              { label: '10', value: 10, desc: '' },
            ]}
          />
          <div className='box__sub_title mb-2'>
            <span className=''>Speed Score:</span>
          </div>

          <Field
            className='form__item'
            component={Select}
            name='workingSpeedScore'
            options={[
              { label: 'SELECT', value: 0, desc: '' },
              { label: '1', value: 1, desc: '' },
              { label: '2', value: 2, desc: '' },
              { label: '3', value: 3, desc: '' },
              { label: '4', value: 4, desc: '' },
              { label: '5', value: 5, desc: '' },
              { label: '6', value: 6, desc: '' },
              { label: '7', value: 7, desc: '' },
              { label: '8', value: 8, desc: '' },
              { label: '9', value: 9, desc: '' },
              { label: '10', value: 10, desc: '' },
            ]}
          />

          <div className='box__sub_title mb-2'>
            <span className=''>Attitude Score:</span>
          </div>
          <Field
            className='form__item'
            component={Select}
            name='workingAttitudeScore'
            options={[
              { label: 'SELECT', value: 0, desc: '' },
              { label: '1', value: 1, desc: '' },
              { label: '2', value: 2, desc: '' },
              { label: '3', value: 3, desc: '' },
              { label: '4', value: 4, desc: '' },
              { label: '5', value: 5, desc: '' },
              { label: '6', value: 6, desc: '' },
              { label: '7', value: 7, desc: '' },
              { label: '8', value: 8, desc: '' },
              { label: '9', value: 9, desc: '' },
              { label: '10', value: 10, desc: '' },
            ]}
          />
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
