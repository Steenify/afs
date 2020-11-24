import React, { Component } from 'react';
import Select from 'react-select';
import { FormGroup } from 'reactstrap';
import './style.scss';

export const ReactSelect = Select;

export const CustomStyles = {
  control: (base) => ({
    ...base,
    minHeight: 54,
    borderRadius: '0.25rem',
  }),
  dropdownIndicator: (base) => ({
    ...base,
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 4,
  }),
  multiValue: (base) => ({
    ...base,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0px 6px',
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: '16px',
  }),
  menu: (provided, state) => ({
    ...provided,
    // width: state.selectProps.width,
    borderBottom: '1px dotted pink',
    color: '#000000',
    zIndex: 1111,
  }),
};

class FormikSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.field?.value || null,
    };

    this.singleChange = this.singleChange.bind(this);
    this.multiChange = this.multiChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.field.value });
  }

  singleChange(event) {
    const { field } = this.props;
    if (field.onChange && event != null) {
      this.setState({ value: event.value });
      field.onChange(event.value);
    } else {
      field.onChange('');
    }
  }

  multiChange(values) {
    const { field } = this.props;
    const value = values && values.length ? values.map((item) => item.value) : '';

    if (value) {
      this.setState({ value });
      field.onChange(value);
    } else {
      field.onChange([]);
    }
  }

  render() {
    const { field, options, label, multi, className, meta = {} } = this.props;

    const { touched, error } = meta;

    const { value } = this.state;
    console.log('🚀 ~ file: FormikSelect.js ~ line 94 ~ FormikSelect ~ render ~ value', field.value);
    let selected;

    if (multi) {
      selected = [];

      if (value && value.length) {
        options.forEach((opt) => {
          value.forEach((item) => {
            if (item === opt.value) {
              selected.push(opt);
            }
          });
        });
      }
    } else {
      selected = options ? options.filter((option) => option.value === field.value)[0] : '';
    }

    return (
      <FormGroup className={`${className} form-group--select form-group ${multi ? 'form-group--select-multi' : ''}`}>
        <label>{label}</label>
        <Select
          {...this.props}
          className=''
          options={options}
          onBlur={(event) => event.preventDefault()}
          onChange={multi ? (values) => this.multiChange(values) : this.singleChange}
          isMulti={multi}
          value={selected || null}
          styles={CustomStyles}
          getOptionLabel={(option) => (
            <div>
              <p className='mb-0 label'>{option.label}</p>
              <p className='small mb-0 desc'>{option.desc}</p>
            </div>
          )}
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

export default FormikSelect;
