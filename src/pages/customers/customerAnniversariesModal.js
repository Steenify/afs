import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import PageModal from 'components/common/pageModal';
import Button from 'components/common/button';

import { ReactComponent as Close } from 'assets/img/close.svg';

import { getUUID, dateStringFromDate } from 'utils';
import moment from 'moment';

import { updateCustomerEditAnniversariesAction, updateCustomerItemAnniversariesAction, updateCustomerAnniversariesAPIAction, getAnniversaryTypesAction } from './actions';
import Select from 'react-select';
import { SingleDatePicker } from 'react-dates';

const returnYears = () => {
  let years = [];
  for (let i = moment().year() - 100; i <= moment().year(); i++) {
    years.push(<option value={i}>{i}</option>);
  }
  return years;
};
const options = ['Birthday', 'First graduation', "Woman's day"].map((label, value) => ({ value, label }));
const SelectStyles = {
  control: (base) => ({
    ...base,
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
  }),
};

const mockAnni = [
  { id: 1, name: 'Birthday', date: moment().add(-20, 'y'), note: 'Send flower' },
  { id: 2, name: 'First graduation', date: moment().add(-3, 'y').add(3, 'm'), note: 'None note entered' },
];

const CustomerTagsModal = (props) => {
  const [anniType, setAnniType] = useState(null);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(false);

  const {
    className,
    showEditAnniversaries,
    updateCustomerEditAnniversariesAction,
    customer,
    updateCustomerItemAnniversariesAction,
    updateCustomerAnniversariesAPIAction,
    getAnniversaryTypesAction,
  } = props;
  const anniversaries = customer?.anniversaries || [];

  useEffect(() => {
    // getAnniversaryTypesAction();
  }, [getAnniversaryTypesAction]);

  const resetState = () => {
    setAnniType(null);
    setDate(null);
    setNote('');
  };

  const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <select className='form-control' value={month.month()} onChange={(e) => onMonthSelect(month, e.target.value)}>
            {moment.months().map((label, value) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <select className='form-control' value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
            {returnYears()}
          </select>
        </div>
      </div>
    );
  };
  const toggle = () => {
    updateCustomerEditAnniversariesAction({
      showEditAnniversaries: false,
      userEditAnniversaries: -1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!anniType?.label) {
      toast.dark('Please select anniversary type!');
      return;
    }

    if (!date) {
      toast.dark('Please select anniversary date!');
      return;
    }

    const newAnniversary = [
      ...anniversaries,
      {
        id: getUUID(),
        name: anniType?.label,
        date,
        note,
        isNew: true,
      },
    ];

    updateCustomerItemAnniversariesAction({
      id: customer.id,
      anniversaries: newAnniversary,
    });
    resetState();
  };

  const handleRemoveTag = (a) => {
    const tagFiltered = anniversaries.filter((anni) => anni.id !== a.id);

    updateCustomerItemAnniversariesAction({
      id: customer.id,
      anniversaries: tagFiltered,
    });
  };

  const handleSave = () => {
    const listTags = anniversaries.map((a) => {
      if (a?.isNew) {
        return {
          ...a,
          id: undefined,
          isNew: undefined,
        };
      }
      return a;
    });

    const data = {
      login: customer?.login,
      payload: {
        anniversaries: listTags,
      },
      onSuccess: () => {
        toggle();
        toast.dark(`[ ${customer?.firstName} ]'s anniversaries updated!`);
        resetState();
      },
    };

    updateCustomerAnniversariesAPIAction(data);
  };

  return (
    <PageModal isOpen={showEditAnniversaries} toggle={toggle} title={`[ ${customer?.firstName} ] Anniversaries`} className={`customers__popup anniversaries ${className}`}>
      <div className='tags__container '>
        <div className='tags__list mb-3'>
          {anniversaries.map((anni) => (
            <div key={`customer__tag__modal__${anni.id}`} className='tags__item'>
              <div className='tags__anni'>
                <div>{anni.name}</div>
                <div>{dateStringFromDate(anni.date)}</div>
                <div>{anni.note}</div>
              </div>
              <button onClick={() => handleRemoveTag(anni)} type='button' className='tags__remove' style={{ top: '15px' }}>
                <span className='icon'>
                  <Close />
                </span>
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className='tags__form'>
          <div className='input-group mb-2'>
            <div style={{ flex: 1 }}>
              <Select options={options} styles={SelectStyles} value={anniType} onChange={setAnniType} />
            </div>
            <div className='input-group-append'>
              <button className='btn btn-outline-secondary tags__create' type='submit'>
                create
              </button>
            </div>
          </div>
          <SingleDatePicker
            date={date}
            onDateChange={setDate}
            isOutsideRange={() => false}
            focused={focused}
            onFocusChange={() => setFocused(!focused)}
            numberOfMonths={1}
            displayFormat='DD/MM/YYYY'
            readOnly={false}
            renderMonthElement={renderMonthElement}
          />
          <textarea className='tags__note form-control mt-2' onChange={(e) => setNote(e.target.value)} value={note} placeholder='' type='text' name='tag' />
        </form>

        <div className='tags__ctas '>
          <Button color='secondary' onClick={toggle} className='tags__cta ml-2' type='button'>
            Cancel
          </Button>
          <Button color='primary' onClick={handleSave} className='tags__cta ml-2' type='button'>
            Save
          </Button>
        </div>
      </div>
    </PageModal>
  );
};

const mapStateToProps = ({ customers }) => {
  const { showEditAnniversaries, userEditAnniversaries } = customers.ui;
  const { items } = customers.list;
  return {
    showEditAnniversaries,
    customer: items[userEditAnniversaries] || {},
  };
};

const mapDispatchToProps = {
  updateCustomerEditAnniversariesAction,
  updateCustomerItemAnniversariesAction,
  getAnniversaryTypesAction,
  updateCustomerAnniversariesAPIAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTagsModal);
