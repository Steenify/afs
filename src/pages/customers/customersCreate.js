import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { toast } from 'react-toastify';
import { parsePhoneNumber } from 'react-phone-number-input';
import { useTranslation } from 'react-i18next';

import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Alert } from 'reactstrap';
import Input from 'components/common/input';
import Button from 'components/common/button';
import PhoneInput from 'components/common/phoneInput';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { createCustomerAction, getCustomerListAction } from './actions';
import { required, email } from 'utils/validation';

const CustomerCreate = ({ style, handleSubmit, ...props }) => {
  const { className, errorRequest, reset, containerClassName } = props;
  const { t } = useTranslation();

  const [modal, setModal] = useState(false);

  const onSubmit = (values) => {
    const params = { ...values };
    const { phoneNumber } = values;

    const phoneInfo = parsePhoneNumber(phoneNumber);

    if (phoneInfo) {
      params['phonePrefix'] = '+' + phoneInfo['countryCallingCode'];
      params['phoneNumber'] = values['phoneNumber'].replace(params['phonePrefix'], '').replace(/\s/g, '');
      params['login'] = values['phoneNumber'].replace(/\+/g, '').replace(/\s/g, '');
    }

    props.createCustomerAction(params).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 201) {
        setModal(false);

        const successMessage = t('baseApp.customerManagement.created') + data.login;

        toast.dark(successMessage);

        props.getCustomerListAction({
          name: '',
          role: '',
          page: 0,
        });
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

  const toggle = () => {
    setModal(!modal);
    reset();
  };

  return (
    <div className={containerClassName}>
      <Button color='primary' onClick={toggle} className='btn-create'>
        + {t('baseApp.customerManagement.home.createLabel')}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggle}>
            {t('baseApp.customerManagement.home.createLabel')}
            <button type='button' className='modal-close' onClick={toggle}>
              <CloseIcon />
            </button>
          </ModalHeader>
          <ModalBody>
            <Field className='...' component={Input} name='firstName' label={t('baseApp.customerManagement.firstName')} />
            <Field className='...' component={Input} name='lastName' label={t('baseApp.customerManagement.lastName')} />
            <Field className='...' component={Input} name='email' label={t('baseApp.customerManagement.email')} validate={[required, email]} />
            <Field className='...' component={PhoneInput} name='phoneNumber' label={t('baseApp.customerManagement.phoneNumber')} validate={[required]} />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type='submit'>
              {t('entity.action.create')}
            </Button>{' '}
            <Button color='secondary' onClick={toggle}>
              {t('entity.action.cancel')}
            </Button>
            {/* {errorRequest && errorRequest.message && (
              <div className='w-100'>
                <Alert color='danger'>{errorRequest.message}</Alert>
              </div>
            )} */}
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ customer }) => {
  return {
    initialValues: {
      activated: true,
      createdBy: '',
      createdDate: '',
      email: '',
      firstName: '',
      imageUrl: '',
      lastModifiedBy: '',
      lastModifiedDate: '',
      lastName: '',
      login: '',
      phoneNumber: '',
      phonePrefix: '',
    },
    // errorRequest: customer.error.create,
  };
};

export default connect(mapStateToProps, {
  createCustomerAction,
  getCustomerListAction,
})(
  reduxForm({
    form: 'customerCreate',
  })(CustomerCreate),
);
