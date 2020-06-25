import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Alert,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Input from 'components/common/input';
import Button from 'components/common/button';
import { Select } from 'components/common/select';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import {
  actGetAllPermissions,
  actCreateAuthority,
  actGetAuthorities,
} from './actions';

import { required } from 'utils/validation';

const RoleCreate = ({ style, handleSubmit, ...props }) => {
  useEffect(() => {
    props.actGetAllPermissions();
  }, []);

  const { className, errorRequest, reset, permissions } = props;
  const { t } = useTranslation();

  const [modal, setModal] = useState(false);

  const onSubmit = (values) => {
    const params = { ...values };
    params.permissions = [];

    values.permissions.forEach((item) => {
      const index = permissions.findIndex((p) => p.name === item);

      if (index !== -1) {
        params.permissions.push(permissions[index]);
      }
    });

    props.actCreateAuthority(params).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 201) {
        setModal(false);

        const successMessage = t('baseApp.authority.created') + data.name;

        toast.dark(successMessage);

        // Get new list of auhority
        props.actGetAuthorities({});
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
        + {t('baseApp.authority.home.createLabel')}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggle}>
            {t('baseApp.authority.home.createLabel')}
            <button type='button' className='modal-close' onClick={toggle}>
              <CloseIcon />
            </button>
          </ModalHeader>
          <ModalBody>
            <Field
              className=''
              component={Input}
              name='name'
              label={t('baseApp.authority.name')}
              validate={[required]}
            />
            <Field
              className=''
              type='textarea'
              component={Input}
              name='description'
              label={t('baseApp.authority.description')}
            />
            <Field
              component={Select}
              name='permissions'
              label={t('baseApp.authority.permission')}
              multi={true}
              options={permissions.map((item) => ({
                label: item.name,
                value: item.name,
              }))}
              validate={[required]}
            />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type='submit'>
              {t('entity.action.create')}
            </Button>{' '}
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

const mapStateToProps = ({ role }) => {
  return {
    initialValues: {
      description: '',
      name: '',
      permissions: [],
    },
    ui: role.ui.create,
    errorRequest: role.error.create,
    permissions: role.data.permissions,
  };
};

export default connect(mapStateToProps, {
  actGetAllPermissions,
  actCreateAuthority,
  actGetAuthorities,
})(
  reduxForm({
    form: 'roleCreate',
  })(RoleCreate),
);
