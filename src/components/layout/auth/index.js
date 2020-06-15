import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const AuthLayout = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);
export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
