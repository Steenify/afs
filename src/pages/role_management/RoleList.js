import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner, UncontrolledAlert } from 'reactstrap';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import Button from 'components/common/button';
import DataTable from 'components/common/DataTable';

import { actGetAuthorities, actDeleteAuthority } from './actions';

const RoleList = (props) => {
  const { t } = useTranslation();
  const { actGetAuthorities } = props;

  const columns = [
    { accessor: 'name', Header: t('baseApp.authority.name'), width: 'auto' },
    {
      accessor: 'edit',
      Header: '',
      Cell: ({ row: { original } }) => (
        <Button tag={Link} to={`/user/role/detail/${original.id}`} color='primary'>
          {t('entity.action.edit')}
        </Button>
      ),
      width: 68,
    },
    {
      accessor: 'delete',
      Header: '',
      Cell: ({ row: { original } }) => (
        <Button color='danger' onClick={() => handleDelete(original.id)}>
          {t('entity.action.delete')}
        </Button>
      ),
      width: 68,
    },
  ];

  useEffect(() => {
    actGetAuthorities();
  }, [actGetAuthorities]);

  const handleDelete = (id) => {
    if (id) {
      props.actDeleteAuthority(id).then((res) => {
        if (res && res.status === 204) {
          props.actGetAuthorities();
        }
      });
    }
  };

  const { authorities = [], ui, error } = props;

  if (ui && ui.loading) {
    return (
      <div className='d-flex py-1 align-items-center justify-content-center'>
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  }

  if (!_.isEmpty(error) && error.message) {
    return <UncontrolledAlert color='danger'>{error.message}</UncontrolledAlert>;
  }

  return (
    <div className='role-list'>
      <DataTable data={authorities} columns={columns} className='bg-white' whiteListSort={['delete']} />
    </div>
  );
};

const mapStateToProps = ({ role }) => ({
  authorities: role.data.authorities,
  ui: role.ui.list,
  error: role.error,
});

export default connect(mapStateToProps, {
  actGetAuthorities,
  actDeleteAuthority,
})(RoleList);
