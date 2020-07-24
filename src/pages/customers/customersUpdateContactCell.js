import React, { useState } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';
import { toast } from 'react-toastify';
import { ReactComponent as Pencil } from 'assets/img/pencil.svg';
import { updateCustomersItemsAction, updateCustomerAction } from './actions';

import ListContacts from 'components/layout/listContact';

const CustomersUpdateContactCell = ({ id, psid, login, updateCustomerAction, updateCustomersItemsAction }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onSave = (value) => {
    toggle();
    updateCustomersItemsAction({
      id: id,
      field: 'psid',
      value: value.exId,
    });

    updateCustomerAction(
      {
        id: id,
        login: login,
        customerExtension: {
          psid: value.exId,
        },
      },
      () => {
        toast.dark(`[${login}] updated with contact ID!`);
      },
    );
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      transitionDuration={0.0000001}
      padding={10}
      onClickOutside={toggle}
      content={() => <ListContacts onSave={onSave} uid={psid} channelName='Turned Ninja' placeholder='Search' />}>
      <button type='button' onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='order__toggle order__assigned w-100'>
        <div className='d-flex'>
          <span className='name'>{psid || '__________'}</span>
          <span className='icon d-block ml-1'>
            <Pencil width='14px' height='14px' />
          </span>
        </div>
      </button>
    </Popover>
  );
};

const mapStateToProps = ({ customers }, ownProps) => {
  const { data } = ownProps;
  const { items } = customers.list;
  const item = items[data] || {};
  return {
    id: item?.id || 0,
    psid: item?.psid || 0,
    login: item?.login || '',
  };
};

const mapDispatchToProps = {
  updateCustomersItemsAction,
  updateCustomerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersUpdateContactCell);
