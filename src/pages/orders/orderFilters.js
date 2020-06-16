import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Input from 'components/common/input';
import Button from 'components/common/button';
// import { Select } from 'components/common/select';
import { reduce } from 'lodash';

import { ReactComponent as SearchIcon } from 'assets/img/search.svg';
import { Col, Row } from 'reactstrap';

import { useTranslation } from 'react-i18next';

import { getOrderStatusAction, updateSelectedStatusAction } from './actions';

const OrderFilters = ({ style, status, handleSubmit, onSearch, ...props }) => {
  const {
    getOrderStatus,
    updateSelectedStatus,
    selectedStatus,
    orderStatusCount,
  } = props;

  useEffect(() => {
    getOrderStatus();
  }, [getOrderStatus]);

  const onSubmit = (values) => {
    onSearch(values);
  };

  const clearForm = () => {
    props.reset();
    onSearch({ sortBy: [{ id: 'number', desc: true }] });
  };

  const { t } = useTranslation();

  const handleChangeStatus = (event) => {
    const { target } = event;
    updateSelectedStatus(target.getAttribute('data'));
  };

  const totalOrders = reduce(
    orderStatusCount,
    (res, value) => {
      return (res += value);
    },
    0,
  );

  return (
    <div className='order__filter'>
      <div className='list_status'>
        <button
          data=''
          onClick={handleChangeStatus}
          key={`list__status_option__all`}
          className={`status ${!selectedStatus && 'active'}`}>
          All
          <span className='number'>{totalOrders || 0}</span>
        </button>
        {status.map((sta) => (
          <button
            data={sta.name}
            onClick={handleChangeStatus}
            key={`list__status_option__${sta.name}`}
            className={`status ${orderStatusCount[sta.name]}  ${sta.name} ${
              selectedStatus === sta.name && 'active'
            }`}>
            {sta.friendlyName}
            {orderStatusCount[sta.name] && (
              <span className='number'>{orderStatusCount[sta.name]}</span>
            )}
          </button>
        ))}
      </div>

      <form
        className='search-advance'
        style={{ ...style }}
        onSubmit={handleSubmit(onSubmit)}>
        <Row form className='align-items-end'>
          <Col md={9}>
            <Field
              className='mb-0 search__box__wrapper'
              component={Input}
              name='text'
              label=''
              placeholder={`Customer Name`}
            />
          </Col>

          <Col md={3}>
            <div className='d-flex w-100'>
              <Button
                color='primary'
                style={{
                  height: 38,
                  paddingLeft: 23,
                  paddingRight: 23,
                  marginRight: 11,
                }}>
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
    </div>
  );
};

const mapStateToProps = ({ order }, { query = {} }) => {
  return {
    initialValues: {
      ...query,
    },
    status: order.status,
    selectedStatus: order.ui.list.selectedStatus,
    orderStatusCount: order.orderStatusCount,
  };
};

const mapDispatchToProps = {
  getOrderStatus: getOrderStatusAction,
  updateSelectedStatus: updateSelectedStatusAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'ordersFilter',
  })(OrderFilters),
);
