import React from 'react';
import { CustomInput } from 'reactstrap';

const Toggle = (props) => {
  return <CustomInput {...props} />;
};

Toggle.defaultProps = {
  label: '\u0020',
};

export default Toggle;
