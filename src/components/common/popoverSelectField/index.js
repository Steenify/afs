import React, { useState, useEffect } from 'react';
import Popover from 'react-tiny-popover';

import Button from 'components/common/button';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import './styles.scss';

const PopoverSelectField = ({ value, options, title, id, onSave, className }) => {
  const [_value, setValue] = useState(value || '');

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setValue(value || '');
  }, [value]);

  const _onChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const _onSave = (e) => {
    e.preventDefault();
    toggle();
    onSave && onSave(_value);
  };

  return (
    <Popover
      isOpen={isOpen}
      transitionDuration={0.000001}
      position={'bottom'}
      padding={10}
      disableReposition
      onClickOutside={toggle}
      content={() => (
        <div className='popover__container p-3'>
          <form action='' onSubmit={_onSave}>
            <div className=''>
              <div className='select'>
                <strong className='title mr-3'>{title}</strong>
                <select className='form-control' value={_value} onChange={_onChange}>
                  {options.map((op) => {
                    return (
                      <option key={`popover__${id}__select__${op.value}`} value={op.value}>
                        {op.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='ctas'>
                <Button onClick={toggle} className='cancel cta pl-0' type='button' color='link'>
                  Cancel
                </Button>
                <Button onClick={_onSave} className='save cta pr-0' type='button' color='link'>
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}>
      <span className={`toggle ${className}`} onClick={() => setIsOpen(!isOpen)}>
        <span className='icon mr-1'>
          <Pencil width='14px' height='14px' />
        </span>
        {value || '__'}
      </span>
    </Popover>
  );
};

export default PopoverSelectField;
