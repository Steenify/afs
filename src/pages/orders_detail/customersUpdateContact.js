import React, { useState } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';
import { ReactComponent as Pencil } from 'assets/img/pencil.svg';
import { updateCustomerAction } from '../customers/actions';

import ListContacts from 'components/layout/listContact';

const CustomersUpdateContact = ({ psid, onSaveData }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onSave = (value) => {
    toggle();
    onSaveData(value);
    // updateCustomer(
    //   {
    //     id: id,
    //     login: login,
    //     customerExtension: {
    //       psid: value.exId,
    //     },
    //   },
    //   () => {
    //     toast.dark(`[${login}] updated with contact ID!`);
    //   },
    // );
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      transitionDuration={0.0000001}
      padding={10}
      onClickOutside={toggle}
      content={() => <ListContacts onSave={onSave} uid={psid} channelName='Turned Ninja' placeholder='Search' />}>
      <button type='button' onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='form-control mb-3 w-100'>
        <div className='d-flex justify-content-end'>
          <span className='name'>{psid || 'No Customer ID'}</span>
          <span className='icon d-block ml-1'>
            <Pencil width='14px' height='14px' />
          </span>
        </div>
      </button>
    </Popover>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateCustomer: updateCustomerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersUpdateContact);
