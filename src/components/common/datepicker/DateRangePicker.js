import React, { PureComponent } from 'react';
import { DayPickerRangeController, SingleDatePicker } from 'react-dates';
import moment from 'moment';

import { Select } from 'components/common/select';

import './date_range.scss';

const selectOptions = [
  { label: 'Custom', value: 'custom' },
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'last_7_days' },
  { label: 'Last 30 days', value: 'last_30_days' },
  { label: 'Last 90 days', value: 'last_90_days' },
  { label: 'Last month', value: 'last_month' },
  { label: 'Last year', value: 'last_year' },
  { label: 'Week to date', value: 'week_to_date' },
  { label: 'Month to date', value: 'month_to_date' },
  { label: 'Quater to date', value: 'quater_to_date' },
  { label: 'Year to date', value: 'year_to_date' },
];

class DateRangePickerWrapper extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 'startDate',
      startDate: props.startDate ? moment(props.startDate) : moment().subtract(30, 'days').startOf('day'),
      endDate: props.endDate ? moment(props.endDate) : moment().endOf('day'),
      range: 'custom',
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate,
      range: 'custom',
    });
  };

  onSelectChange = (value) => {
    const { startDate, endDate } = this.state;
    let _startDate, _endDate;
    switch (value) {
      case 'today': {
        _startDate = moment();
        _endDate = moment();
        break;
      }
      case 'yesterday': {
        _startDate = moment().add('-1', 'days');
        _endDate = moment().add('-1', 'days');
        break;
      }
      case 'last_7_days': {
        _startDate = moment().add('-6', 'days');
        _endDate = moment();
        break;
      }
      case 'last_30_days': {
        _startDate = moment().add('-29', 'days');
        _endDate = moment();
        break;
      }
      case 'last_90_days': {
        _startDate = moment().add('-89', 'days');
        _endDate = moment();
        break;
      }
      case 'last_month': {
        _startDate = moment().add('-1', 'months').startOf('month');
        _endDate = moment().add('-1', 'months').endOf('month');
        break;
      }
      case 'last_year': {
        _startDate = moment().add('-1', 'years').startOf('year');
        _endDate = moment().add('-1', 'years').endOf('year');
        break;
      }
      case 'week_to_date': {
        _startDate = moment().startOf('isoWeek');
        _endDate = moment();
        break;
      }
      case 'month_to_date': {
        _startDate = moment().startOf('month');
        _endDate = moment();
        break;
      }
      case 'quater_to_date': {
        _startDate = moment().startOf('quarter');
        _endDate = moment();
        break;
      }
      case 'year_to_date': {
        _startDate = moment().startOf('year');
        _endDate = moment();
        break;
      }
      default: {
        _startDate = startDate;
        _endDate = endDate;
      }
    }
    this.setState({ range: value, startDate: _startDate.startOf('day'), endDate: _endDate.endOf('day') });
  };

  handleClose = () => {
    const { onClear } = this.props;
    onClear();
  };

  handleApply = () => {
    const { onChange } = this.props;
    const { startDate, endDate, range } = this.state;
    const label = selectOptions.find((i) => i.value === range).label;
    onChange({ startDate, endDate, label });
  };

  render() {
    const { focusedInput, startDate, endDate, range } = this.state;
    const {
      isOutsideRange,
      //  startDateId, endDateId, displayFormat, numberOfMonths, customArrowIcon, showDefaultInputIcon, inputIconPosition
    } = this.props;

    const orientationList = ['horizontal', 'vertical'];

    const orientation = window.innerWidth < 540 ? orientationList[1] : orientationList[0];

    return (
      <div className='date_range_picker'>
        <div className='date_range_picker__header'>
          <Select label='Date Range' input={{ value: range, onChange: this.onSelectChange }} options={selectOptions} />
        </div>
        <div className='date_range_picker__body'>
          {/* <DateRangePicker
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            focusedInput={focusedInput}
            startDate={startDate}
            endDate={endDate}
            startDateId={startDateId}
            endDateId={endDateId}
            numberOfMonths={numberOfMonths}
            isOutsideRange={isOutsideRange}
            displayFormat={displayFormat}
            firstDayOfWeek={1}
            orientation={orientation}
            customArrowIcon={customArrowIcon}
            showDefaultInputIcon={showDefaultInputIcon}
            inputIconPosition={inputIconPosition}
            startDateAriaLabel='Starting'
            endDateAriaLabel='Ending'
            anchorDirection='right'
            noBorder={true}
          /> */}
          <div className='date_range_picker__inputs row'>
            <div className='col-lg-6'>
              <span>Starting</span>
              <SingleDatePicker
                placeholder='Start Date'
                date={startDate}
                focused={false}
                onFocusChange={() => {}}
                isOutsideRange={isOutsideRange}
                onDateChange={(date) => this.onDatesChange({ startDate: date, endDate })}
                noBorder
              />
            </div>
            <div className='col-lg-6'>
              <span>Ending</span>
              <SingleDatePicker
                placeholder='End Date'
                date={endDate}
                focused={false}
                onFocusChange={() => {}}
                isOutsideRange={isOutsideRange}
                onDateChange={(date) => this.onDatesChange({ startDate, endDate: date })}
                noBorder
              />
            </div>
          </div>

          <div className='date_range_picker__controller'>
            <DayPickerRangeController
              startDate={startDate}
              endDate={endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={focusedInput}
              onFocusChange={(focusedInput) => focusedInput && this.setState({ focusedInput })}
              numberOfMonths={2}
              isOutsideRange={isOutsideRange}
              firstDayOfWeek={1}
              renderDayContents={this.renderDate}
              initialVisibleMonth={() => (!startDate ? moment() : moment(endDate)).subtract(1, 'months')}
              orientation={orientation}
              minimumNights={0}
              noBorder
              hideKeyboardShortcutsPanel
              verticalHeight={500}
            />
          </div>
        </div>
        <div className='date_range_picker__footer'>
          <button onClick={this.handleClose} className='date_range_picker__control date_range_picker__cancel'>
            Clear
          </button>
          <button onClick={this.handleApply} className='date_range_picker__control date_range_picker__apply'>
            Apply
          </button>
        </div>
      </div>
    );
  }
}

DateRangePickerWrapper.defaultProps = {
  onChange: () => {},
  onClear: () => {},
  startDate: moment().subtract(30, 'days'),
  endDate: moment(),
  startDateId: 'your_unique_start_date_id',
  endDateId: 'your_unique_end_date_id',
  displayFormat: 'DD/MM/YYYY',
  numberOfMonths: 2,
  isOutsideRange: (day) => {
    const today = moment();
    return today.diff(day) < 1;
  },
  className: '',
  customArrowIcon: <span className='date_range_picker__icon'></span>,
};

export default DateRangePickerWrapper;
