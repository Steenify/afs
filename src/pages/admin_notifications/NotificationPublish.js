import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert, Table, Input, FormGroup, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Button from 'components/common/button';
import UserSearchBox from 'pages/user_management/UserSearchBox';
import Paging from 'components/common/paging';
import TableBody from 'components/common/tableBody';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { actPublishNotification, getAllNotificationsAction } from './actions';
import { actGetUsers } from 'pages/user_management/actions';
import { getPaginationItemsNumber } from 'utils';

const NotificationPublish = ({ style, handleSubmit, ...props }) => {
  useEffect(() => {}, []);

  const { className, errorRequest, reset, users = [], data } = props;
  const { t } = useTranslation();

  const [modal, setModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setSelectedUsers([]);
    reset();
    setIsCheckAll(false);

    if (!modal) {
      props.actGetUsers();
    }
  };

  const handlePaging = (activePage) => {
    setActivePage(activePage);
    props
      .actGetUsers({
        page: activePage - 1,
      })
      .then((res) => {
        let count = 0;
        res.data.forEach((user) => {
          const index = selectedUsers.findIndex((item) => item.id === user.id);
          if (index !== -1) {
            count++;
          }
        });

        if (count === res.data.length) {
          setIsCheckAll(true);
        } else {
          setIsCheckAll(false);
        }
      });
  };

  const handleSearch = (values) => {
    props.actGetUsers(values);
  };

  const handleSelect = (e, item) => {
    const checked = e.target.checked;
    const id = item['id'] || '';
    let count = 0;

    props.users.forEach((user) => {
      const index = selectedUsers.findIndex((item) => item.id === user.id);
      if (index !== -1) {
        count++;
      }
    });

    if (checked) {
      const i = selectedUsers.findIndex((item) => item.id === id);
      if (i === -1) {
        count++;
      }
      setSelectedUsers((oldUsers) => [...oldUsers, item]);
    } else {
      const i = selectedUsers.findIndex((item) => item.id === id);
      if (i !== -1) {
        count--;
      }

      setSelectedUsers(selectedUsers.filter((item) => item.id !== id));
    }

    if (count === props.users.length) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  };

  const handlePublish = () => {
    const params = { ...data };

    params['usersLogin'] = selectedUsers.map((item) => item.login);

    props.actPublishNotification(params).then((res) => {
      const { status, data } = res;
      const { errorKey, message } = data;

      if (status === 204) {
        const successMessage = t('baseApp.notification.published') + data.login;

        toast.dark(successMessage);

        props.getAllNotificationsAction();
      } else {
        let errorMessage = '';
        if (errorKey) {
          const key = ']error.' + errorKey;
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

  const handleSelectAll = (e) => {
    const checked = e.target.checked;

    setIsCheckAll(checked);

    if (checked) {
      props.users.forEach((user) => {
        const index = selectedUsers.findIndex((item) => item.id === user.id);

        if (index === -1) {
          setSelectedUsers((oldUsers) => [...oldUsers, user]);
        }
      });
    } else {
      setSelectedUsers([]);
    }
  };

  const columns = [
    {
      key: 'checkbox',
      label: t('baseApp.notification.users'),
      content: (item) => (
        <FormGroup check>
          <Label check>
            <Input type='checkbox' onChange={(e) => handleSelect(e, item)} checked={selectedUsers.filter((st) => st.id === item.id).length > 0} />
            {item.firstName} {item.lastName}
          </Label>
        </FormGroup>
      ),
    },
  ];

  return (
    <div>
      <Button color='success' onClick={toggle}>
        {t('baseApp.notification.publish')}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className} size='lg'>
        <ModalHeader toggle={toggle}>
          {t('baseApp.notification.publishNotification')}
          <button type='button' className='modal-close' onClick={toggle}>
            <CloseIcon />
          </button>
        </ModalHeader>
        <ModalBody>
          <UserSearchBox onSearch={handleSearch} style={{ marginBottom: 20 }} />
          <div className='steenify-table'>
            <Table hover className='bg-white'>
              <thead>
                <tr>
                  <th>
                    <FormGroup check>
                      <Label check>
                        <Input type='checkbox' onChange={(e) => handleSelectAll(e)} checked={isCheckAll} />
                        {t('baseApp.notification.users')}
                      </Label>
                    </FormGroup>
                  </th>
                </tr>
              </thead>
              <TableBody data={users} columns={columns} />
            </Table>
          </div>
          <div className='d-flex justify-content-center'>
            <Paging items={getPaginationItemsNumber(props.totalItems, 10)} activePage={activePage} onSelect={handlePaging} maxButtons={5} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' type='button' onClick={handlePublish}>
            Publish
          </Button>
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
          {errorRequest && errorRequest.message && (
            <div className='w-100'>
              <Alert color='danger'>{errorRequest.message}</Alert>
            </div>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    initialValues: {
      description: '',
      status: 'DRAFT',
      usersLogin: [],
    },
    users: user.data.users,
    totalItems: user.data.totalItems,
    ui: user.ui.list,
    error: user.error,
  };
};

export default connect(mapStateToProps, {
  actGetUsers,
  actPublishNotification,
  getAllNotificationsAction,
})(
  reduxForm({
    form: 'notificationPublish',
  })(NotificationPublish),
);
