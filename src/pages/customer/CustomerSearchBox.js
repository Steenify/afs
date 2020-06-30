import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Input from 'components/common/input';
import Button from 'components/common/button';
import { Select } from 'components/common/select';
import { ReactComponent as SearchIcon } from 'assets/img/search.svg';
import { Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { actGetCustomers } from './actions';
import { actGetCustomerGroups } from 'pages/customer/actions';

const CustomerSearchBox = ({ style, handleSubmit, onSearch, ...props }) => {
  useEffect(() => {
    props.actGetCustomerGroups();
  }, []);

  const onSubmit = (values) => {
    onSearch(values);
  };

  const clearForm = () => {
    props.reset();
    props.actGetCustomers();
  };

  const { customerGroups } = props;
  const { t } = useTranslation();

  return (
    <form
      className='search-advance'
      style={{ ...style }}
      onSubmit={handleSubmit(onSubmit)}>
      <Row form className='align-items-end'>
        <Col md={4}>
          <Field
            className='mb-0'
            component={Input}
            name='name'
            label=''
            placeholder={t('baseApp.customerManagement.search.name') + '...'}
          />
        </Col>
        <Col md={4}>
          <Field
            className='mb-0'
            component={Select}
            name='customerGroups'
            label=''
            placeholder={t('baseApp.customerManagement.search.group') + '...'}
            options={customerGroups.map((item) => ({
              label: item.name,
              value: item.id,
              desc: item.description,
            }))}
          />
        </Col>
        <Col md={4}>
          <div className='d-flex w-100'>
            <Button
              className='mr-1'
              color='primary'
              style={{ height: 38, paddingLeft: 23, paddingRight: 23 }}>
              <SearchIcon className='btn-icon' />
              {t('entity.action.search')}
            </Button>
            <Button
              onClick={() => clearForm()}
              style={{ height: 38, paddingLeft: 23, paddingRight: 23 }}>
              {t('entity.action.clear')}
            </Button>
          </div>
        </Col>
      </Row>
    </form>
  );
};

const mapStateToProps = ({ query = {}, customer }) => {
  return {
    initialValues: {
      ...query,
    },
    customerGroups: customer.data.customerGroups,
  };
};

export default connect(mapStateToProps, {
  actGetCustomers,
  actGetCustomerGroups,
})(
  reduxForm({
    form: 'customerSearchBox',
  })(CustomerSearchBox),
);
