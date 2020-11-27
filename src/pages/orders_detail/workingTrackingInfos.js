import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { toast } from 'react-toastify';
import { Form, Spinner, Alert } from 'reactstrap';

import Input from 'components/common/input';
import Button from 'components/common/button';
import { FieldDatePicker } from 'components/common/datepicker';

import { getUUID } from 'utils';
import { updateTrackingCodeWorkLogAction } from './actions';
import { ReactComponent as Close } from 'assets/img/close.svg';

import moment from 'moment';

const validate = (values) => {
  const errors = {};
  if (!values.items || !values.items.length) {
    return errors;
  } else {
    const itemsArrayErrors = [];
    values.items.forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member || !member.trackingCode) {
        memberErrors.trackingCode = 'Required';
        itemsArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.trackingUrl) {
        memberErrors.trackingUrl = 'Required';
        itemsArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.estimatedDeliveryFrom) {
        memberErrors.estimatedDeliveryFrom = 'Required';
        itemsArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.estimatedDeliveryTo) {
        memberErrors.estimatedDeliveryTo = 'Required';
        itemsArrayErrors[memberIndex] = memberErrors;
      }
      if (moment(member?.estimatedDeliveryFrom).isAfter(moment(member?.estimatedDeliveryTo))) {
        memberErrors.estimatedDeliveryFrom = 'Invalid';
        memberErrors.estimatedDeliveryTo = 'Invalid';
        itemsArrayErrors[memberIndex] = memberErrors;
      }
    });
    if (itemsArrayErrors.length) {
      errors.items = itemsArrayErrors;
    }
  }
  return errors;
};

const WorkingTrackingInfoForm = (props) => {
  const { ui, errorRequest, handleSubmit, printfulTrackings, updateTrackingCodeWorkLogAction, id } = props;

  const onSubmit = (values) => {
    if (id) {
      const array = values?.items || [];
      const deletedItems = printfulTrackings?.filter((item) => !array.find((a) => a.id === item.id))?.map((item) => ({ ...item, deleted: true })) || [];
      const items = array.map((item) => {
        if (!item?.isNew) {
          return item;
        } else {
          return { ...item, id: undefined, isNew: undefined };
        }
      });
      updateTrackingCodeWorkLogAction(id, { items: [...items, ...deletedItems] }, () => {
        toast.dark('Tracking info is updated.');
      });
    }
  };

  const newTrackingInfo = () => ({
    id: getUUID(),
    trackingUrl: '',
    trackingCode: '',
    estimatedDeliveryFrom: '',
    estimatedDeliveryTo: '',
    isNew: true,
  });

  const renderTrackingInfo = ({ fields, meta: { error, submitFailed } }) => {
    return (
      <div>
        <div className='d-flex justify-content-end'>
          <Button
            onClick={() => fields.push(newTrackingInfo())}
            color='primary'
            type='button'
            style={{
              height: 38,
              display: 'inline-flex',
              alignItems: 'center',
              minWidth: 110,
              justifyContent: 'center',
            }}>
            Add Tracking Info
          </Button>
        </div>
        {fields.map((info, index) => (
          <div key={`tracking__info__item__${info?.id}`}>
            <div className='box__header mb-0'>
              <div className='box__title w-100'>{`Tracking Info ${index + 1}`}</div>
              <button type='button' className='close' onClick={() => fields.remove(index)}>
                <Close width='30px' height='30px' />
              </button>
            </div>
            <div className='m-2'>
              <span>URL</span>
              <Field className='' component={Input} name={`${info}.trackingUrl`} placeholder={''} />
            </div>
            <div className='m-2'>
              <span>Code</span>
              <Field className='' component={Input} name={`${info}.trackingCode`} placeholder={''} />
            </div>
            <div className='d-flex mb-2'>
              <div className='m-2'>
                <span>Estimated Delivery From</span>
                <FieldDatePicker className='' name={`${info}.estimatedDeliveryFrom`} placeholder={''} />
              </div>
              <div className='m-2'>
                <span>Estimated Delivery To</span>
                <FieldDatePicker className='' name={`${info}.estimatedDeliveryTo`} placeholder={''} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className=''>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {errorRequest && errorRequest.message && <Alert color='danger'>{errorRequest.message}</Alert>}

        <FieldArray name='items' component={renderTrackingInfo} />

        <div className='d-flex justify-content-end mt-4'>
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
  );
};

const mapStateToProps = ({ customerDetail, orderDetail }) => {
  const { printfulTrackings = [], id } = orderDetail?.data?.order || {};
  return {
    initialValues: { items: printfulTrackings },
    printfulTrackings,
    id,
  };
};

const mapDispatchToProps = {
  updateTrackingCodeWorkLogAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'trackingInfo',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: false,
  })(WorkingTrackingInfoForm),
);
