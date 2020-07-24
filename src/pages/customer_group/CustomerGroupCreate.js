import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Alert } from 'reactstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Input from 'components/common/input';
import Button from 'components/common/button';
import { Select } from 'components/common/select';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { actCreateCustomerGroup, actGetCustomerGroups, getCustomerListAction } from '../customers/actions';

import { required } from 'utils/validation';

const CustomerGroupCreate = ({ style, handleSubmit, ...props }) => {
  useEffect(() => {
    props.getCustomerListAction();
  }, []);

  const { className, errorRequest, reset, customers } = props;

  const { t } = useTranslation();

  const [modal, setModal] = useState(false);

  const onSubmit = (values) => {
    const params = { ...values };
    params['users'] = values.users.map((item) => ({ id: item }));

    props.actCreateCustomerGroup(params).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (res && res.status === 201) {
        setModal(false);

        const successMessage = t('baseApp.customerGroup.created') + data.name;

        toast.dark(successMessage);

        props.actGetCustomerGroups();
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
    <div>
      <Button color='primary' onClick={toggle} className='btn-create'>
        + {t('baseApp.customerGroup.home.createLabel')}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggle}>
            {t('baseApp.customerGroup.home.createLabel')}
            <button type='button' className='modal-close' onClick={toggle}>
              <CloseIcon />
            </button>
          </ModalHeader>
          <ModalBody>
            <Field className='' component={Input} name='name' label={t('baseApp.customerGroup.name')} validate={[required]} />
            <Field className='form-group--textarea' type='textarea' component={Input} name='description' label={t('baseApp.customerGroup.description')} />
            <Field
              className='...'
              component={Select}
              name='users'
              label={t('baseApp.customerGroup.customer')}
              multi={true}
              options={customers.map((item) => ({
                label: item.firstName + ' ' + item.lastName,
                value: item.id,
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
            {errorRequest && errorRequest.message && (
              <div className='w-100'>
                <Alert color='danger'>{errorRequest.message}</Alert>
              </div>
            )}
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ customer }) => {
  return {
    initialValues: {
      name: '',
      description: '',
      users: [],
    },
    customers: customer.data.customers,
    ui: customer.ui.createGroup,
    errorRequest: customer.error.createGroup,
  };
};

export default connect(mapStateToProps, {
  actCreateCustomerGroup,
  actGetCustomerGroups,
  getCustomerListAction,
})(
  reduxForm({
    form: 'customerGroupCreate',
  })(CustomerGroupCreate),
);
