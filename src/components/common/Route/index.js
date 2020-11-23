import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import DefaultLayout from 'components/layout/default';
import AuthLayout from 'components/layout/auth';

import { actGetAccount, actSignout } from 'pages/auth/actions';

const RouteWrapper = ({ component: Component, isPrivate, role, layout, className, ...rest }) => {
  const { isAuthUser, accountInfo } = rest;

  // useEffect(() => {
  //   if (isAuthUser) {
  //     rest.actGetAccount().then((res) => {
  //       if (res?.status === 401) {
  //         rest.actSignout();
  //       }
  //     });
  //   }
  // }, []);

  if (isPrivate && !isAuthUser) {
    return <Redirect to='/signin' />;
  }

  if (!isPrivate && isAuthUser && rest.path === '/signin') {
    return (window.location.href = '/');
  }

  if (role && accountInfo && accountInfo.permissions && accountInfo.permissions.indexOf(role) === -1) {
    return <Redirect to='/' />;
  }

  const Layout = isAuthUser ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout className={`${className || ''}`}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuthUser: auth.data.isAuthUser,
    accountInfo: auth.data.accountInfo,
  };
};

export default connect(mapStateToProps, { actGetAccount, actSignout })(RouteWrapper);

RouteWrapper.defaultProps = {
  isPrivate: false,
  role: '',
};
