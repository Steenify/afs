/* @flow */
import React, { useState } from 'react';
import { SingleDatePicker } from 'react-dates';

import './style.scss';

export const ReactDates = ({ date, onChange, placeholder, displayFormat = 'DD-MM-YYYY', isOutsideRange }) => {
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
      isOutsideRange={isOutsideRange}
    />
  );
};
