import React, { useState } from 'react'
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
import { FormGroup, Label } from 'reactstrap'
import moment from 'moment'

import './style.scss'

export const DatePicker = ({ label, placeholder, required, onChange, touched, error }) => {

  const [focused, setFocused] = useState(false)
  const [date, setDate] = useState()

  const handleChange = (value) => {
    setDate(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <FormGroup className="form-group--custom form-group--datepicker">
      {label && <Label>{required && (<span style={{color: '#c50000'}}>* </span>)}{label}</Label>}
      <SingleDatePicker
        date={date}
        onDateChange={handleChange}
        focused={focused}
        onFocusChange={() => setFocused(!focused)}
        numberOfMonths={1}
        displayFormat="DD-MM-YYYY"
        placeholder={placeholder}
        id="date_picker_id"
      />
      { touched &&
        (
          (error && <span className="error" style={{ color: 'red' }}>{error}</span>)
        )
      }
    </FormGroup>
  )
}