import React, { Component } from 'react';
import Select from 'react-select';
import { FormGroup } from 'reactstrap';
import './style.scss';

const ErrorSpan = () => <span></span>;

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
  }),
};

export class SelectInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };

    this.singleChange = this.singleChange.bind(this);
    this.multiChange = this.multiChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.input.value });
  }

  singleChange(event) {
    const { input } = this.props;
    if (input.onChange && event != null) {
      this.setState({ value: event.value });
      input.onChange(event.value);
    } else {
      input.onChange(null);
    }
  }

  multiChange(values) {
    const { input } = this.props;
    const value =
      values && values.length ? values.map((item) => item.value) : '';

    if (value) {
      this.setState({ value });
      input.onChange(value);
    } else {
      input.onChange(null);
    }
  }

  render() {
    const { input, options, label, multi, className, meta = {} } = this.props;

    const { touched, error } = meta;

    const { value } = this.state;
    let selected;

    if (multi) {
      selected = [];
      console.log('SelectInput -> render -> value', value);

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
      selected = options
        ? options.filter((option) => option.value === input.value)[0]
        : '';
    }

    console.log('SelectInput -> render -> selected', selected);

    return (
      <FormGroup
        className={`${className} form-group--select form-group ${
          multi ? 'form-group--select-multi' : ''
        }`}>
        <label>{label}</label>
        <Select
          {...this.props}
          className=''
          options={options}
          onBlur={(event) => event.preventDefault()}
          onChange={
            multi ? (values) => this.multiChange(values) : this.singleChange
          }
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
