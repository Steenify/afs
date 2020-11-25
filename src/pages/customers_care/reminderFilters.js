import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import Popover from 'react-tiny-popover';
import Select from 'react-select';

import { updateReminderFilterAction } from './actions';
import { REMINDER_TYPES, REMINDER_STATUS, REMINDER_TYPES_COLOR } from './const';
import { ReactComponent as Cavet } from 'assets/img/cavet.svg';
class CustomersFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
  }

  componentDidMount() {
    const { updateReminderFilterAction, name } = this.props;
    updateReminderFilterAction({
      name,
      page: 0,
    });
  }

  handleChangeText = (e) => {
    this.handleSearchTextAPI(e.target.value);
  };

  handleChangeGroup = (e) => {
    const { updateReminderFilterAction } = this.props;
    const customerGroup = e.target.getAttribute('data');
    updateReminderFilterAction({
      name: '',
      page: 0,
      customerGroup,
    });
  };

  handleSearchTextAPI = (value) => {
    const { updateReminderFilterAction } = this.props;
    updateReminderFilterAction({
      name: value,
      page: 0,
    });
  };

  render() {
    const { name, customerGroup } = this.props;

    return (
      <div className='customers__filters'>
        <div className='list_status d-none d-sm-block'>
          <button data='' onClick={this.handleChangeGroup} key={`list__status_option__all`} className={`status ${customerGroup === '' && 'active'}`}>
            All
          </button>
          <button data='NEW' onClick={this.handleChangeGroup} key={`list__status_option__new`} className={`status ${customerGroup === 'NEW' && 'active'}`}>
            New
          </button>
          <button data='RETURNING' onClick={this.handleChangeGroup} key={`list__status_option__returning`} className={`status ${customerGroup === 'RETURNING' && 'active'}`}>
            Returning
          </button>
        </div>
        <div className='filter__main'>
          <div className='filter__text'>
            <input type='text' defaultValue={name} placeholder='Search customers' className='search__box form-control' onChange={this.handleChangeText} />
          </div>
        </div>
      </div>
    );
  }
}

const ReminderFilters = ({ updateReminderFilterAction, status, type }) => {
  // const [isShowType, setIsShowType] = useState(false);
  const [isShowStatus, setIsShowStatus] = useState(false);

  const { ANNIVERSARY, BIRTHDAY, DAY_AFTER_FIRST_ORDER_COMPLETE, RETURN_CUSTOMERS } = REMINDER_TYPES;
  const { CREATED, REMINDED } = REMINDER_STATUS;
  const handleChangeType = (e) => {
    const type = e.target.getAttribute('data');
    updateReminderFilterAction({
      name: '',
      page: 0,
      type,
    });
  };
  const handleChangeStatus = (e) => {
    const status = e.target.getAttribute('data');
    updateReminderFilterAction({
      name: '',
      page: 0,
      status,
    });
  };
  return (
    <div className='customers__filters'>
      <div className='list_status' style={{ display: 'flex', flexWrap: 'wrap' }}>
        <button data='' onClick={handleChangeType} key={`list__status_option__all`} className={`status ${type === '' && 'active'}`}>
          All
        </button>
        {[ANNIVERSARY, BIRTHDAY, DAY_AFTER_FIRST_ORDER_COMPLETE, RETURN_CUSTOMERS].map((item) => (
          <button data={item} onClick={handleChangeType} key={`list__status_option__returning`} className={`status ${REMINDER_TYPES_COLOR[item] || ''} ${type === item && 'active'}`}>
            {item}
          </button>
        ))}
        <div className='ml-auto'>
          <Popover
            isOpen={isShowStatus}
            position={'bottom'}
            transitionDuration={0.000001}
            padding={10}
            onClickOutside={() => setIsShowStatus(false)}
            content={() => (
              <div className='order__filter inside_popover'>
                <div className='list_status'>
                  <button data={''} onClick={handleChangeStatus} key={`list__status_option__all`} className={`status ${status === '' && 'active'}`}>
                    All
                  </button>
                  {[CREATED, REMINDED].map((value, index) => (
                    <button data={value} onClick={handleChangeStatus} key={`list__productAction_option__${index}`} className={`status ${value === status && 'active'}`}>
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            )}>
            <button onClick={() => setIsShowStatus(true)} className='filter__toggle ml-2' style={{ borderRadius: '4px' }}>
              <span className='dispaly_name'>{status || 'Status'}</span>
              <span className='icon mb-1 ml-2'>
                <Cavet />
              </span>
            </button>
          </Popover>
        </div>
      </div>
      {/* <div className='filter__main'>
        <Popover
          isOpen={isShowType}
          position={'bottom'}
          transitionDuration={0.000001}
          padding={10}
          onClickOutside={() => setIsShowType(false)}
          content={() => (
            <div className='order__filter inside_popover'>
              <div className='list_status'>
                <button data={''} onClick={handleChangeType} key={`list__status_option__all`} className={`status ${type === '' && 'active'}`}>
                  All
                </button>
                {[ANNIVERSARY, BIRTHDAY, DAY_AFTER_FIRST_ORDER_COMPLETE, RETURN_CUSTOMERS].map((value, index) => (
                  <button data={value} onClick={handleChangeType} key={`list__productAction_option__${index}`} className={`status ${value === type && 'active'}`}>
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )}>
          <button onClick={() => setIsShowType(true)} className='filter__toggle' style={{ borderRadius: '4px' }}>
            <span className='dispaly_name'>{type || 'Type'}</span>
            <span className='icon mb-1 ml-2'>
              <Cavet />
            </span>
          </button>
        </Popover>

        <Popover
          isOpen={isShowStatus}
          position={'bottom'}
          transitionDuration={0.000001}
          padding={10}
          onClickOutside={() => setIsShowStatus(false)}
          content={() => (
            <div className='order__filter inside_popover'>
              <div className='list_status'>
                <button data={''} onClick={handleChangeStatus} key={`list__status_option__all`} className={`status ${status === '' && 'active'}`}>
                  All
                </button>
                {[CREATED, REMINDED].map((value, index) => (
                  <button data={value} onClick={handleChangeStatus} key={`list__productAction_option__${index}`} className={`status ${value === status && 'active'}`}>
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )}>
          <button onClick={() => setIsShowStatus(true)} className='filter__toggle ml-2' style={{ borderRadius: '4px' }}>
            <span className='dispaly_name'>{status || 'Status'}</span>
            <span className='icon mb-1 ml-2'>
              <Cavet />
            </span>
          </button>
        </Popover>
      </div> */}
    </div>
  );
};

const mapStateToProps = ({ customersCare }) => {
  return {
    type: customersCare.filter.type,
    status: customersCare.filter.status,
  };
};

const mapDispatchToProps = {
  updateReminderFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderFilters);
