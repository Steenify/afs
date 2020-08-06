import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';

import { WEB_ROUTES } from 'configs';

import { getOrderDetailAction } from './actions';
import { getOrderTableStatusAction } from 'components/tables/orders/actions';

import Detail from './orderDetail';

import './style.scss';

// import { useTranslation } from 'react-i18next';

const OrderDetail = ({ getOrderDetail, getOrderTableStatusAction }) => {
  let { id } = useParams();

  useEffect(() => {
    getOrderTableStatusAction({});
    getOrderDetail(id);
  }, [getOrderDetail, id, getOrderTableStatusAction]);

  return (
    <Layout documentTitle={WEB_ROUTES.ORDERS_DETAIL.title} container fluid>
      <Breadcrumb
        data={[
          {
            title: WEB_ROUTES.ORDERS.title,
            active: false,
            path: WEB_ROUTES.ORDERS.path,
            isBack: true,
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
  getOrderTableStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
