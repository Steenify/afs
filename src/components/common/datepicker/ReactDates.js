/* @flow */
import React, { useState } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment, { type Moment } from 'moment';

import './style.scss';

type Props = {
  date?: Moment | any,

  placeholder?: string,

  displayFormat?: string | (() => string),

  onChange: (value: any) => void,
};

export const ReactDates = ({
  date,
  onChange,
  placeholder,
  displayFormat = 'DD-MM-YYYY',
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [initDate, setInitDate] = useState(date);

  const handleChange = (value) => {
    setInitDate(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <SingleDatePicker
      date={initDate}
      onDateChange={handleChange}
      focused={focused}
      onFocusChange={() => setFocused(!focused)}
      numberOfMonths={1}
      displayFormat={displayFormat}
      placeholder={placeholder}
    />
  );
};
