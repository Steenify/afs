import React, { useState } from 'react';
import Popover from 'react-tiny-popover';
import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import ListContacts from 'components/layout/listContact';

const ContactPopover = ({ psid, onSaveData = () => {}, channelName = 'Turned Ninja' }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onSave = (value) => {
    toggle();
    onSaveData(value);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      transitionDuration={0.0000001}
      padding={10}
      onClickOutside={toggle}
      content={() => <ListContacts onSave={onSave} uid={psid} channelName={''} placeholder='Search' />}>
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

export default ContactPopover;
