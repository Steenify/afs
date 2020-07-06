import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import DateRangePicker from 'components/common/datepicker/DateRangePicker';

import { dateStringFromDate } from 'utils';

import { getPayoutListAction, updatePayoutFilterAction } from './actions';

class OrderFilterDate extends PureComponent {
  constructor() {
    super();
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  handleChange = ({ startDate, endDate }) => {
    this.toggle();
    const { updatePayoutFilter, getPayoutList } = this.props;
    updatePayoutFilter({
      from: startDate.format(),
      to: endDate.format(),
    });
    getPayoutList({});
  };

  handleClear = () => {
    const { updatePayoutFilter, getPayoutList } = this.props;
    this.toggle();
    updatePayoutFilter({
      from: null,
      to: null,
    });
    getPayoutList({});
  };

  render() {
    const { dropdownOpen } = this.state;
    const { from, to } = this.props;
    const hasFilter = from && to;

    return (
      <Dropdown
        className='filter__dropdown'
        isOpen={dropdownOpen}
        toggle={this.toggle}>
        <DropdownToggle className='filter__toggle filter__dropdown_toggle'>
          <span className='dispaly_name'>
            {hasFilter ? (
              <span>
                {dateStringFromDate(from)} - {dateStringFromDate(to)}
              </span>
            ) : (
              'Filter by Date'
            )}
          </span>
          <span className='icon mb-2 ml-2'>
            <Cavet />
          </span>
        </DropdownToggle>
        <DropdownMenu right className='filter__dropdown_menu'>
          <DateRangePicker
            className='filter__date'
            onChange={this.handleChange}
            onClear={this.handleClear}
          />
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const mapStateToProps = ({ payouts, auth }) => {
  const { from, to } = payouts.filter;
  return {
    from,
    to,
  };
};

const mapDispatchToProps = {
  getPayoutList: getPayoutListAction,
  updatePayoutFilter: updatePayoutFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilterDate);
