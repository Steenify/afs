/* @flow */
import * as React from 'react';
import { CustomInput } from 'reactstrap';
import type { CustomInputProps } from 'reactstrap';

const Toggle = (props: CustomInputProps): React.Node => {
  return <CustomInput {...props} />;
};

Toggle.defaultProps = {
  label: '\u0020',
};

export default Toggle;
