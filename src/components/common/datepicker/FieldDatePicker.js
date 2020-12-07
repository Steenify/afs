import React, { useState, useEffect } from 'react';
import { Field } from 'redux-form';
import { SingleDatePicker } from 'react-dates';
import { FormGroup, Label } from 'reactstrap';
import moment from 'moment';

import './style.scss';

const returnYears = () => {
  let years = [];
  for (let i = moment().year() - 100; i <= moment().year(); i++) {
    years.push(<option value={i}>{i}</option>);
  }
  return years;
};

const DatePicker = ({ label, placeholder, required, onChange, touched, error, value, className }) => {
  const [focused, setFocused] = useState(false);
  const [isTouched, setTouched] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, [focused]);
  useEffect(() => {
    if (count > 1 && !focused) {
      setTouched(true);
    }
  }, [count]);
  const date = value ? moment(value) : null;

  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <select className='form-control' value={month.month()} onChange={(e) => onMonthSelect(month, e.target.value)}>
            {moment.months().map((label, value) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <select className='form-control' value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
            {returnYears()}
          </select>
        </div>
      </div>
    );
  };

  return (
    <FormGroup className={`${className || ''} form-group--custom form-group--datepicker`}>
      {label && (
        <Label>
          {required && <span style={{ color: '#c50000' }}>* </span>}
          {label}
        </Label>
      )}
      <SingleDatePicker
        date={date}
        onDateChange={handleChange}
        isOutsideRange={() => false}
        focused={focused}
        onFocusChange={() => setFocused(!focused)}
        numberOfMonths={1}
        displayFormat='DD/MM/YYYY'
        readOnly={false}
        placeholder={placeholder}
        renderMonthElement={renderMonthElement}
        id='date_picker_id'
      />
      {isTouched && error && (
        <span className='error' style={{ color: 'red' }}>
          {error}
        </span>
      )}
    </FormGroup>
  );
};

export const FieldDatePicker = (props) => {
  const { name, label, placeholder, required, className } = props;

  const renderComponent = ({ input, meta, ...other }) => {
    return (
      <DatePicker
        className={className}
        label={label}
        placeholder={placeholder}
        required={required}
        onChange={input.onChange}
        value={input.value}
        touched={meta.touched}
        error={meta.error}
        {...other}
      />
    );
  };

  return <Field name={name} component={renderComponent} {...props} />;
};
