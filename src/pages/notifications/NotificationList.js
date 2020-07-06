import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import Button from 'components/common/button';
import NotificationPublish from './NotificationPublish';
import DataTable from 'components/common/DataTable';

import { getPaginationItemsNumber } from 'utils';

import { actGetNotifications, actDeleteNotification } from './actions';
import { getErrorMessage } from 'utils';

const NotificationList = (props) => {
  const { t } = useTranslation();

  const columns = [
    {
      accessor: 'title',
      Header: t('baseApp.notification.title'),
      width: 'auto',
    },
    {
      accessor: 'description',
      Header: t('baseApp.notification.description'),
      width: 'auto',
    },
    {
      accessor: 'status',
      Header: t('baseApp.notification.status'),
      Cell: ({ row: { original } }) => {
        if (original.status === 'PUBLISHED')
          return (
            <Badge color='primary' pill>
              {original.status}
            </Badge>
          );

        return (
          <Badge color='secondary' pill>
            {original.status}
          </Badge>
        );
      },
      width: 'auto',
    },
    {
      accessor: 'publish',
      Header: '',
      width: 90,
      Cell: ({ row: { original } }) => {
        if (original.status === 'PUBLISHED') {
          return '';
        }
        return <NotificationPublish data={original} />;
      },
    },
    {
      accessor: 'delete',
      Header: '',
      width: 90,
      Cell: ({ row: { original } }) => {
        if (original.status === 'PUBLISHED') {
          return '';
        }

        return (
          <Button color='danger' onClick={() => handleDelete(original.id)}>
            {t('entity.action.delete')}
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    props.actGetNotifications();
  }, []);

  const handleLoad = (activePage) => {
    props.actGetNotifications({
      page: activePage - 1,
    });
  };

  const handleDelete = (id) => {
    if (id) {
      props.actDeleteNotification(id).then((res) => {
        const { status, data } = res;
        const { errorKey, message } = data;

        if (status === 204) {
          props.actGetNotifications();
        } else {
          const errorMessage = getErrorMessage(status, errorKey, message);
          toast.error(errorMessage);
        }
      });
    }
  };

  const { notifications = [], ui, error } = props;

  return (
    <div>
      <DataTable
        data={notifications}
        columns={columns}
        className='bg-white'
        serverSide
        totalPage={(size) => getPaginationItemsNumber(props.totalItems, size)}
        onLoad={handleLoad}
        whiteListSort={['publish', 'delete']}
      />
    </div>
  );
};

const mapStateToProps = ({ notification }) => ({
  notifications: notification.data.notifications,
  totalItems: notification.data.totalItems,
  ui: notification.ui.list,
  error: notification.error.list,
});

export default connect(mapStateToProps, {
  actGetNotifications,
  actDeleteNotification,
})(NotificationList);
