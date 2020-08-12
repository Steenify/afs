import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route as PublicRoute } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer, Flip } from 'react-toastify';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { getOrderTableCountByStatusAction } from 'components/tables/orders/actions';

import Route from 'components/common/Route';
import FirerBaseApp from 'components/layout/firebaseapp';

import NotFound from 'pages/404';
// import Home from 'pages/home';
import UserManagement from 'pages/user_management';
import UserDetail from 'pages/user_management/UserDetail';
import Signin from 'pages/auth/Signin';
import ChangePassword from 'pages/auth/ ChangePassword';
import RoleManagement from 'pages/role_management';
import RoleDetails from 'pages/role_management/RoleDetails';
import PermissionManagement from 'pages/role_management/PermissionManagement';
import PermissionDetails from 'pages/role_management/PermissionDetails';
import CustomerManagement from 'pages/customers';
import CustomerDetail from 'pages/customers_detail/index';
import CustomerDetailEdit from 'pages/customers_detail/customersDetailEdit';
import CustomerGroupDetail from 'pages/customer_group/CustomerGroupDetail';
import AdminNotifications from 'pages/admin_notifications';
import Notifications from 'pages/notifications';
import SystemPropertiesManagement from 'pages/system_property_management';
import SystemPropertyDetail from 'pages/system_property_management/SystemPropertyDetail';

import Orders from 'pages/orders';
import OrderDetail from 'pages/orders_detail';
import Settings from 'pages/settings';
import Artists from 'pages/artists';
import ArtistDetail from 'pages/artist_detail/artistDetail';
import ArtistDetailForm from 'pages/artists/artistDetailForm';
import CS from 'pages/customer_service';
import CSDetail from 'pages/customer_service/customerServiceDetail';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import TermsAndConditions from 'pages/TermsAndConditions';
import Payouts from 'pages/payouts';
import PayoutsDetail from 'pages/payouts/payoutsDetail';
import GalleryListing from 'pages/gallery/gallery_listing';
import GalleryDetail from 'pages/gallery/gallery_detail';
import LateNotificationList from 'pages/late_notification/listing';

import head from 'utils/head';

import { WEB_ROUTES, mapRoles } from 'configs';

import CustomerChat from 'vendor/facebookChat';

const App = ({ getOrderTableCountByStatusAction, accountInfo }) => {
  const isLogged = !isEmpty(accountInfo);

  const isArtist = accountInfo?.authorities?.includes(mapRoles.ROLE_ARTIST) || false;

  useEffect(() => {
    if (isLogged) {
      getOrderTableCountByStatusAction({});
    }
  }, [getOrderTableCountByStatusAction, isLogged]);
  return (
    <>
      <Helmet {...head}></Helmet>
      <Router>
        <Switch>
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/change-password' isPrivate={true} component={ChangePassword} />
          <Route exact path={WEB_ROUTES.USER_LIST.path} component={UserManagement} isPrivate={true} role={WEB_ROUTES.USER_LIST.permission} />
          <Route exact path='/user/detail/:login' component={UserDetail} isPrivate={true} role={WEB_ROUTES.USER_DETAIL.permission} />
          <Route exact path={WEB_ROUTES.USER_ROLE.path} component={RoleManagement} isPrivate={true} role={WEB_ROUTES.USER_ROLE.permission} />
          <Route exact path='/user/role/detail/:id' component={RoleDetails} isPrivate={true} role={WEB_ROUTES.USER_ROLE.permission} />
          <Route exact path={WEB_ROUTES.USER_PERMISSION.path} component={PermissionManagement} isPrivate={true} role={WEB_ROUTES.USER_PERMISSION.permission} />
          <Route exact path='/user/permission/detail/:id' component={PermissionDetails} isPrivate={true} role={WEB_ROUTES.USER_PERMISSION.permission} />
          <Route exact path={WEB_ROUTES.CUSTOMER_LIST.path} component={CustomerManagement} isPrivate={true} role={WEB_ROUTES.CUSTOMER_LIST.permission} />
          <Route exact path={WEB_ROUTES.CUSTOMER_DETAIL.path} component={CustomerDetail} isPrivate={true} role={WEB_ROUTES.CUSTOMER_DETAIL.permission} />
          <Route exact path={WEB_ROUTES.CUSTOMER_DETAIL_EDIT.path} component={CustomerDetailEdit} isPrivate={true} role={WEB_ROUTES.CUSTOMER_DETAIL_EDIT.permission} />
          {/* <Route
            exact
            path={WEB_ROUTES.CUSTOMER_GROUP_LIST.path}
            component={CustomerGroupManagement}
            isPrivate={true}
            role={WEB_ROUTES.CUSTOMER_GROUP_LIST.permission}
          /> */}
          <Route exact path={WEB_ROUTES.CUSTOMER_GROUP_DETAIL.path} component={CustomerGroupDetail} isPrivate={true} role={WEB_ROUTES.CUSTOMER_GROUP_DETAIL.permission} />
          <Route exact path={WEB_ROUTES.NOTIFICATION_LIST.path} component={Notifications} isPrivate={true} role={WEB_ROUTES.NOTIFICATION_LIST.permission} />
          <Route exact path={WEB_ROUTES.ADMIN_NOTIFICATION_LIST.path} component={AdminNotifications} isPrivate={true} role={WEB_ROUTES.ADMIN_NOTIFICATION_LIST.permission} />
          <Route exact path={WEB_ROUTES.SYSTEM_PROPERTY_LIST.path} component={SystemPropertiesManagement} isPrivate={true} role={WEB_ROUTES.SYSTEM_PROPERTY_LIST.permission} />
          <Route exact path={WEB_ROUTES.SYSTEM_PROPERTY_DETAIL.path} component={SystemPropertyDetail} isPrivate={true} role={WEB_ROUTES.SYSTEM_PROPERTY_DETAIL.permission} />
          {/* <Route
          exact
          path={WEB_ROUTES.HOME.path}
          role={WEB_ROUTES.HOME.permission}
          component={Home}
          isPrivate={true}
        /> */}

          <Route exact isPrivate={true} path={WEB_ROUTES.ORDERS.path} role={WEB_ROUTES.ORDERS.permission} component={Orders} />
          <Route exact path={WEB_ROUTES.ORDERS_DETAIL.path} component={OrderDetail} />
          <Route exact path={WEB_ROUTES.SETTINGS.path} component={Settings} isPrivate={true} role={WEB_ROUTES.SETTINGS.permission} />
          <Route exact path={WEB_ROUTES.ARTISTS.path} component={Artists} isPrivate={true} role={WEB_ROUTES.ARTISTS.permission} />
          <Route exact path={WEB_ROUTES.ARTISTS_DETAIL.path} component={ArtistDetail} isPrivate={true} role={WEB_ROUTES.ARTISTS_DETAIL.permission} />
          <Route exact path={WEB_ROUTES.ARTISTS_DETAIL_FORM.path} component={ArtistDetailForm} isPrivate={true} role={WEB_ROUTES.ARTISTS_DETAIL_FORM.permission} />

          <Route exact path={WEB_ROUTES.CS.path} component={CS} isPrivate={true} role={WEB_ROUTES.CS.permission} />
          <Route exact path={WEB_ROUTES.CS_DETAIL.path} component={CSDetail} isPrivate={true} role={WEB_ROUTES.CS_DETAIL.permission} />

          <Route exact path={WEB_ROUTES.PAYOUTS.path} component={Payouts} isPrivate={true} role={WEB_ROUTES.PAYOUTS.permission} />
          <Route exact path={WEB_ROUTES.PAYOUTS_DETAIL.path} component={PayoutsDetail} isPrivate={true} role={WEB_ROUTES.PAYOUTS_DETAIL.permission} />
          <Route exact path={WEB_ROUTES.GALLERY_LISTING.path} component={GalleryListing} isPrivate={true} role={WEB_ROUTES.GALLERY_LISTING.permission} />
          <Route exact path={WEB_ROUTES.LATE_NOTIFICATION.path} component={LateNotificationList} isPrivate={true} role={WEB_ROUTES.LATE_NOTIFICATION.permission} />
          <Route exact path={WEB_ROUTES.GALLERY_DETAIL.path} component={GalleryDetail} isPrivate={true} role={WEB_ROUTES.GALLERY_DETAIL.permission} className='gallery__page' />
          <PublicRoute exact path={WEB_ROUTES.POLICY.path}>
            <PrivacyPolicy />
          </PublicRoute>
          <PublicRoute exact path={WEB_ROUTES.TERMS.path}>
            <TermsAndConditions />
          </PublicRoute>

          <Route component={NotFound} />
        </Switch>
        <FirerBaseApp />
      </Router>

      <ToastContainer position='bottom-left' transition={Flip} autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} />

      {isArtist && isLogged && <CustomerChat pageId='101946964870983' appId='1171193606568391' />}
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  accountInfo: auth.data.accountInfo,
});
const mapDispatchToProps = {
  getOrderTableCountByStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
