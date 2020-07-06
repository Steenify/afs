import React from 'react';
import { connect } from 'react-redux';

function CanShow({ children, accountInfo, permission }) {
  const isValid = accountInfo?.permissions?.includes(permission) || false;
  if (!isValid) {
    return null;
  }
  return <>{children}</>;
}

CanShow.defaultProps = {
  permission: '',
};

const mapStateToProps = ({ auth }) => ({
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CanShow);
