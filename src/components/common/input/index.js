import React, { PureComponent } from 'react';
import {
  FormGroup,
  InputGroup,
  Label,
  InputGroupAddon,
  Input,
} from 'reactstrap';

import './style.scss';

class RFInput extends PureComponent {
  render() {
    const {
      input,
      label,
      required,
      id,
      isInputGroup,
      iconInputGroup,
      className,
      placeholder,
      groupStyle,
      inputStyle,
      disabled,
      meta: { touched, error, warning },
      type,
    } = this.props;
    return (
      <FormGroup
        className={`${className || ''} form-group--input`}
        style={groupStyle}>
        {label && (
          <Label>
            {required && <span style={{ color: '#c50000' }}>* </span>}
            {label}
          </Label>
        )}
        {isInputGroup ? (
          <InputGroup className='input-group--custom'>
            <InputGroupAddon addonType='prepend'>
              {iconInputGroup}
            </InputGroupAddon>
            <Input
              {...input}
              onChange={input.onChange}
              id={id}
              placeholder={placeholder}
              style={inputStyle}
              type={type || 'text'}
              checked={input.value}
            />
          </InputGroup>
        ) : (
          <Input
            disabled={disabled}
            {...input}
            onChange={input.onChange}
            id={id}
            placeholder={placeholder}
            type={type || 'text'}
            checked={input.value}
          />
        )}
        {touched && error && (
          <span className='error mt-1 d-block small' style={{ color: 'red' }}>
            {error}
          </span>
        )}
      </FormGroup>
    );
  }
}

export default RFInput;
