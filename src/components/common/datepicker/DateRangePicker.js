import React, { PureComponent } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import './date_range.scss';

class DateRangePickerWrapper extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 'startDate',
      startDate: props.startDate,
      endDate: props.endDate,
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate,
    });
  };

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  };

  handleClose = () => {
    const { onClear } = this.props;
    onClear();
  };

  handleApply = () => {
    const { onChange } = this.props;
    const { startDate, endDate } = this.state;
    onChange({ startDate, endDate });
  };

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const {
      startDateId,
      endDateId,
      displayFormat,
      numberOfMonths,
      isOutsideRange,
      customArrowIcon,
      showDefaultInputIcon,
      inputIconPosition,
    } = this.props;

    const orientationList = ['horizontal', 'vertical'];

    const orientation =
      window.innerWidth < 540 ? orientationList[1] : orientationList[0];

    return (
      <div className='date_range_picker'>
        <div className='date_range_picker__body'>
          <DateRangePicker
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
          />
        </div>
        <div className='date_range_picker__footer'>
          <button
            onClick={this.handleClose}
            className='date_range_picker__control date_range_picker__cancel'>
            Clear
          </button>
          <button
            onClick={this.handleApply}
            className='date_range_picker__control date_range_picker__apply'>
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
