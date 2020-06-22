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

import { actCreateNotification, actGetNotifications } from './actions';
import { required } from 'utils/validation';

const NotificationCreate = ({ style, handleSubmit, ...props }) => {
  useEffect(() => {}, []);

  const { className, errorRequest, reset } = props;
  const { t } = useTranslation();

  const [modal, setModal] = useState(false);

  const onSubmit = (values) => {
    props.actCreateNotification(values).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 201) {
        setModal(false);

        const successMessage =
          t('baseApp.notification.created') + data.description;

        toast.success(successMessage);

        props.actGetNotifications();
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
        + {t('baseApp.notification.home.createLabel')}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggle}>
            {t('baseApp.notification.home.createLabel')}
            <button type='button' className='modal-close' onClick={toggle}>
              <CloseIcon />
            </button>
          </ModalHeader>
          <ModalBody>
            <Field
              component={Input}
              name='title'
              label={t('baseApp.notification.title')}
              validate={[required]}
            />
            <Field
              component={Input}
              name='description'
              label={t('baseApp.notification.description')}
              type='textarea'
              validate={[required]}
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

const mapStateToProps = ({ notification }) => {
  return {
    initialValues: {
      description: '',
      status: 'DRAFT',
      usersLogin: [],
      title: '',
    },
  };
};

export default connect(mapStateToProps, {
  actCreateNotification,
  actGetNotifications,
})(
  reduxForm({
    form: 'notificationCreate',
  })(NotificationCreate),
);
