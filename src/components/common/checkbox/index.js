import React, { PureComponent } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

import './style.scss';

class RFCheckbox extends PureComponent {
  render() {
    const {
      input,
      label,
      required,
      id,
      // isInputGroup,
      // iconInputGroup,
      className,
      placeholder,
      groupStyle,
      inputStyle,
      // disabled,
      meta: { touched, error, warning },
      // type,
      labelActive,
      labelUnActive,
    } = this.props;
    return (
      <FormGroup className={`${className || ''}`} style={groupStyle} check>
        <Label check>
          {required && <span style={{ color: '#c50000' }}>* </span>}
          <Input
            {...input}
            onChange={input.onChange}
            id={id}
            placeholder={placeholder}
            style={inputStyle}
            type='checkbox'
            checked={input.value}
          />
          {labelActive && labelUnActive
            ? input.value
              ? labelActive
              : labelUnActive
            : label}
        </Label>
        {touched && error && (
          <span className='error' style={{ color: 'red' }}>
            {error}
          </span>
        )}
      </FormGroup>
    );
  }
}

export default RFCheckbox;
