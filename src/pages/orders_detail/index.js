import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';

import { WEB_ROUTES } from 'configs';

import { getOrderTableStatusAction } from 'components/tables/orders/actions';

import { DesktopLG, MobileLG } from 'components/responsive';

import { getOrderDetailAction } from './actions';

import Detail from './desktop/orderDetail';

import DetailMobi from './mobile/orderDetailMobi';

const OrderDetail = ({ getOrderDetail, getOrderTableStatusAction }) => {
  let { id } = useParams();

  useEffect(() => {
    getOrderTableStatusAction({});
    getOrderDetail(id);
  }, [getOrderDetail, id, getOrderTableStatusAction]);

  return (
    <Layout documentTitle={WEB_ROUTES.ORDERS_DETAIL.title} container fluid>
      <DesktopLG>
        <>
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
        </>
      </DesktopLG>
      <MobileLG>
        <DetailMobi id={id} />
      </MobileLG>
    </Layout>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getOrderDetail: getOrderDetailAction,
  getOrderTableStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
