import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { PERMITTIONS_CONFIG } from 'configs';

import { updatePayoutFilterAction, getPayoutListAction, getPayoutSummaryAction } from './actions';

import PayoutsFilterAssignee from './payoutsFiltersAssignee';
import PayoutsFilterDate from './payoutsFiltersDate';

class PayoutFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
  }

  handleChangeText = (e) => {
    const { updatePayoutFilter } = this.props;
    const { value } = e.target;
    updatePayoutFilter({
      text: value,
      page: 0,
    });

    this.handleSearchTextAPI();
  };

  handleSearchTextAPI = () => {
    const { getPayoutList, getPayoutSummary } = this.props;
    getPayoutList({});
    getPayoutSummary({});
  };

  render() {
    const { text, accountInfo } = this.props;

    const canAssign = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ASSIGN_BOOKING);

    return (
      <div className='payouts__filters'>
        <div className='filter__main'>
          {canAssign && <PayoutsFilterDate />}
          <div className='filter__text'>
            <input style={{ borderRadius: canAssign ? 0 : undefined }} type='text' value={text} placeholder='Search orders' className='search__box form-control' onChange={this.handleChangeText} />
          </div>
          {canAssign && <PayoutsFilterAssignee />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ payouts, auth }) => {
  return {
    text: payouts.filter.text,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  updatePayoutFilter: updatePayoutFilterAction,
  getPayoutList: getPayoutListAction,
  getPayoutSummary: getPayoutSummaryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutFilters);
