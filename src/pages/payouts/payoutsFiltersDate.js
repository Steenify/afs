import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import DateRangePicker from 'components/common/datepicker/DateRangePicker';

import { getPayoutListAction, updatePayoutFilterAction, getPayoutSummaryAction } from './actions';

class OrderFilterDate extends PureComponent {
  constructor() {
    super();
    this.state = {
      dropdownOpen: false,
      dropdownLabel: 'Filter by Date',
    };
  }

  toggle = (label) => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
      dropdownLabel: label,
    }));
  };

  handleChange = ({ startDate, endDate, label }) => {
    this.toggle(label);
    const { updatePayoutFilter, getPayoutList, getPayoutSummaryAction } = this.props;
    updatePayoutFilter({
      from: startDate.format(),
      to: endDate.format(),
    });
    getPayoutList({});
    getPayoutSummaryAction({});
  };

  handleClear = () => {
    const { updatePayoutFilter, getPayoutList } = this.props;
    this.toggle('Filter by Date');
    updatePayoutFilter({
      from: null,
      to: null,
    });
    getPayoutList({});
  };

  render() {
    const { dropdownOpen, dropdownLabel } = this.state;
    const { from, to } = this.props;
    return (
      <Dropdown className='filter__dropdown' isOpen={dropdownOpen} toggle={() => this.toggle(dropdownLabel)}>
        <DropdownToggle className='filter__toggle filter__dropdown_toggle'>
          <span className='dispaly_name'>{dropdownLabel}</span>
          <span className='icon mb-2 ml-2'>
            <Cavet />
          </span>
        </DropdownToggle>
        <DropdownMenu left='true' className='filter__dropdown_menu' persist>
          <DateRangePicker className='filter__date' startDate={from} endDate={to} onChange={this.handleChange} onClear={this.handleClear} />
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
  getPayoutSummaryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilterDate);
