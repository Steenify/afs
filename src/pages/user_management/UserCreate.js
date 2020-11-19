import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { parsePhoneNumber } from 'react-phone-number-input';
import Input from 'components/common/input';
import Button from 'components/common/button';
import { Select } from 'components/common/select';
// import Checkbox from 'components/common/checkbox';
import PhoneInput from 'components/common/phoneInput';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { actGetAuthorities } from 'pages/role_management/actions';
import { actCreateUser, actGetUsers } from './actions';

import { required, minValue, email } from 'utils/validation';
const minValue4 = minValue(4);

const UserCreate = ({ style, handleSubmit, containerClassName, actGetAuthorities, ...props }) => {
  useEffect(() => {
    actGetAuthorities();
  }, [actGetAuthorities]);

  const { className, authorities, reset } = props;
  const { t } = useTranslation();

  const selectAuthorities = authorities.filter((item) => item.name !== 'ROLE_CUSTOMER');

  const [modal, setModal] = useState(false);

  const onSubmit = (values) => {
    const params = { ...values };
    const { phoneNumber } = values;

    const phoneInfo = parsePhoneNumber(phoneNumber);

    if (phoneInfo) {
      params['phonePrefix'] = '+' + phoneInfo['countryCallingCode'];
      params['phoneNumber'] = values['phoneNumber'].replace(params['phonePrefix'], '').replace(/\s/g, '');
    }

    props.actCreateUser(params).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 201) {
        setModal(false);
        const successMessage = t('baseApp.userManagement.created') + data.login;

        toast.dark(successMessage);

        // Get new list of user
        props.actGetUsers();
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
      <Button className='btn-create' color='primary' onClick={toggle}>
        {'+ ' + t('baseApp.userManagement.home.createLabel')}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggle}>
            {t('baseApp.userManagement.home.createLabel')}
            <button type='button' className='modal-close' onClick={toggle}>
              <CloseIcon />
            </button>
          </ModalHeader>
          <ModalBody>
            <Field className='...' component={Input} name='login' label={t('baseApp.userManagement.login')} validate={[required, minValue4]} />
            <Field className='...' component={Input} name='rawPassword' label='Password' type='password' validate={[required, minValue4]} />
            <Field className='...' component={Input} name='firstName' label={t('baseApp.userManagement.firstName')} />
            <Field className='...' component={Input} name='lastName' label={t('baseApp.userManagement.lastName')} />
            <Field className='...' component={Input} name='email' label={t('baseApp.userManagement.email')} validate={[required, email]} />
            <Field className='...' component={PhoneInput} name='phoneNumber' label={t('baseApp.userManagement.phoneNumber')} />
            <Field
              className='form-group--role'
              component={Select}
              name='authorities'
              label={t('baseApp.userManagement.profiles')}
              multi={true}
              options={selectAuthorities.map((item) => ({
                label: item.name,
                value: item.name,
                desc: item.description,
              }))}
            />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type='submit'>
              {t('entity.action.create')}
            </Button>
            <Button color='secondary' onClick={toggle}>
              {t('entity.action.cancel')}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ role, user }) => {
  return {
    initialValues: {
      activated: true,
      authorities: [],
      createdBy: '',
      createdDate: '',
      email: '',
      firstName: '',
      imageUrl: '',
      langKey: 'en',
      lastModifiedBy: '',
      lastModifiedDate: '',
      lastName: '',
      login: '',
      permissions: [],
      phoneNumber: '',
      phonePrefix: '',
      rawPassword: '',
    },
    authorities: role.data.authorities,
    errorRequest: user.error.create,
  };
};

export default connect(mapStateToProps, {
  actGetAuthorities,
  actCreateUser,
  actGetUsers,
})(
  reduxForm({
    form: 'userCreate',
  })(UserCreate),
);
