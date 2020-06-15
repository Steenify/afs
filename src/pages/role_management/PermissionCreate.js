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
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { actCreatePermission, actGetAllPermissions } from './actions';
import { required } from 'utils/validation';

const PermissionCreate = ({ style, handleSubmit, ...props }) => {
  const { className, errorRequest, reset } = props;
  const { t } = useTranslation();

  const [modal, setModal] = useState(false);

  const onSubmit = (values) => {
    const params = { ...values };
    props.actCreatePermission(params).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 201) {
        setModal(false);

        const successMessage = t('baseApp.permission.created') + data.name;

        toast.success(successMessage);

        props.actGetAllPermissions();
      } else {
        let errorMessage = '';
        if (errorKey) {
          const key = 'error.' + errorKey;
          errorMessage = t(key);
        } else {
          if (status) {
            const key = 'error:error.http.' + status;
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
        + {t('baseApp.permission.home.createLabel')}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggle}>
            {t('baseApp.permission.home.createLabel')}
            <button type='button' className='modal-close' onClick={toggle}>
              <CloseIcon />
            </button>
          </ModalHeader>
          <ModalBody>
            <Field
              className=''
              component={Input}
              name='name'
              label={t('baseApp.permission.name')}
              validate={[required]}
            />
            <Field
              className=''
              type='textarea'
              component={Input}
              name='description'
              label={t('baseApp.permission.description')}
            />
            <Field
              className=''
              component={Input}
              name='permissionGroup'
              label={t('baseApp.permission.permissionGroup')}
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
      permissionGroup: '',
    },
    ui: role.ui.create,
    errorRequest: role.error.create,
  };
};

export default connect(mapStateToProps, {
  actCreatePermission,
  actGetAllPermissions,
})(
  reduxForm({
    form: 'permissionCreate',
  })(PermissionCreate),
);
