import React from 'react'
import { Field } from 'redux-form'
import { DatePicker } from './DatePicker'

export const FieldDatePicker = (props) => {

  const { name, label, placeholder, required } = props

  const renderComponent = ({ input, meta, ...other }) => {
    return (
      <DatePicker
        label={label}
        placeholder={placeholder}
        required={required}
        onChange={input.onChange}
        value={input.value}
        touched={meta.touched}
        error={meta.error}
      />
    )
  }

  return (
    <Field
      name={name}
      component={renderComponent}
      {...props}
    />
  )
}
