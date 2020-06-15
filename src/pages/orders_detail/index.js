import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';

import { WEB_ROUTES } from 'config';

import { getOrderDetailAction } from './actions';
import { getOrderStatusAction } from '../orders/actions';

import Detail from './orderDetail';

import './style.scss';

// import { useTranslation } from 'react-i18next';

const OrderDetail = ({ getOrderDetail, getOrderStatus }) => {
  let { id } = useParams();
  useEffect(() => {
    getOrderStatus();
    getOrderDetail(id);
  }, [getOrderDetail, id, getOrderStatus]);

  return (
    <Layout documentTitle={WEB_ROUTES.ORDERS_DETAIL.title} container fluid>
      <Breadcrumb
        data={[
          {
            title: WEB_ROUTES.ORDERS_DETAIL.title,
            active: false,
            path: WEB_ROUTES.ORDERS_DETAIL.path,
          },
        ]}
      />
      <Detail id={id} />
    </Layout>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getOrderDetail: getOrderDetailAction,
  getOrderStatus: getOrderStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
