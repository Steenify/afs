import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import Button from 'components/common/button';
import DataTable from 'components/common/DataTable';

import { actGetAllSystemProperties } from './actions';

const SystemPropertyList = (props) => {
  const { t } = useTranslation();

  const columns = [
    {
      accessor: 'name',
      Header: t('baseApp.systemProperties.name'),
      width: 'auto',
    },
    {
      accessor: 'description',
      Header: t('baseApp.systemProperties.description'),
      width: 'auto',
    },
    {
      accessor: 'value',
      Header: t('baseApp.systemProperties.value'),
      width: 'auto',
    },
    {
      accessor: 'edit',
      Header: '',
      Cell: ({ row: { original } }) => {
        if (!original.isEditable) {
          return '';
        }
        return (
          <Button
            tag={Link}
            to={`/system-property/detail/${original.id}`}
            color='primary'>
            {t('entity.action.edit')}
          </Button>
        );
      },
      width: 68,
    },
  ];

  useEffect(() => {
    props.actGetAllSystemProperties();
  }, []);

  const { systemProperties = [], ui, error } = props;

  return (
    <div className='system-properties-list'>
      <DataTable
        data={systemProperties}
        columns={columns}
        className='bg-white'
      />
    </div>
  );
};

const mapStateToProps = ({ systemProperty }) => ({
  systemProperties: systemProperty.data.systemProperties,
});

export default connect(mapStateToProps, { actGetAllSystemProperties })(
  SystemPropertyList,
);
