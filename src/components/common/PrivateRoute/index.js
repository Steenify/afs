import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getData } from 'utils';

const PrivateRoute = ({
  hasFamilyPass,
  requireUser,
  component: Component,
  redirect,
  stage1,
  stage2,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      (stage1 && false) || stage2 ? (
        getData('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirect || '/',
              state: { from: props.location },
            }}
          />
        )
      ) : (
        <Redirect
          to={{
            pathname: 'blocked',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = ({ global }, ownProps) => {
  const { user } = global.data;
  const { hasFamilyPass } = user;

  return { hasFamilyPass, ...ownProps };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
