import React, { PureComponent } from 'react';

import { FormGroup, Label } from 'reactstrap';
import PhoneInput from 'react-phone-number-input';

import './style.scss';

class RFPhoneInput extends PureComponent {
  render() {
    const {
      input,
      label,
      required,
      className,
      groupStyle,
      meta: { touched, error },
    } = this.props;

    return (
      <FormGroup
        className={`${className || ''} form-group--custom form-group--input`}
        style={groupStyle}>
        {label && (
          <Label>
            {required && <span style={{ color: '#c50000' }}>* </span>}
            {label}
          </Label>
        )}
        <PhoneInput
          international
          defaultCountry='VN'
          {...input}
          onBlur={(e) => e.preventDefault}
        />
        {touched && error && (
          <span className='error mt-1 d-block small' style={{ color: 'red' }}>
            {error}
          </span>
        )}
      </FormGroup>
    );
  }
}

export default RFPhoneInput;
