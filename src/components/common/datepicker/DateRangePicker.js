import React from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 'startDate',
      startDate: props.startDate,
      endDate: props.endDate,
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    const { onChange } = this.props;
    this.setState(
      {
        startDate,
        endDate,
      },
      () => {
        onChange({
          startDate,
          endDate,
        });
      },
    );
  };

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  };

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const today = moment();

    return (
      <div>
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          startDateId='your_unique_start_date_id'
          endDateId='your_unique_end_date_id'
          numberOfMonths={2}
          isOutsideRange={(day) => today.diff(day) < 1}
          initialVisibleMonth={() => today.subtract(1, 'months')}
          displayFormat='DD/MM/YYYY'
          firstDayOfWeek={1}
        />
      </div>
    );
  }
}

DateRangePickerWrapper.defaultProps = {
  onChange: () => {},
  startDate: moment().subtract(30, 'days'),
  endDate: moment(),
};

export default DateRangePickerWrapper;
