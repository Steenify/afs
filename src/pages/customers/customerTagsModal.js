import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import PageModal from 'components/common/pageModal';
import Button from 'components/common/button';

import { ReactComponent as Close } from 'assets/img/close.svg';

import { getUUID } from 'utils';

import { updateCustmerEditTagAction, updateCustmerItemTagAction, updateCustomerTagsAPIAction } from './actions';

const CustomerTagsModal = (props) => {
  const [newTag, setNewTag] = useState('');

  const { className, showEditTag, updateCustmerEditTag, customer, updateCustmerItemTag, updateCustomerTagsAPI, isDetail } = props;
  const tags = customer?.tags || [];

  const handleChangeTag = (e) => {
    const { value } = e.target;
    setNewTag(value);
  };

  const toggle = () => {
    updateCustmerEditTag({
      showEditTag: false,
      userEditTag: -1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newTag) {
      toast.dark('Please insert tag!');
      return;
    }
    const tagFiltered = tags.filter((tag) => (tag.name || '').toLowerCase() === (newTag || '').toLowerCase());
    if (tagFiltered.length) {
      setNewTag('');
      return;
    }

    const newTags = [
      ...tags,
      {
        id: getUUID(),
        name: (newTag || '').toLowerCase(),
      },
    ];

    setNewTag('');
    updateCustmerItemTag({
      id: customer.id,
      tags: newTags,
      isDetail,
    });
  };

  const handleRemoveTag = (t) => {
    const tagFiltered = tags.filter((tag) => tag.id !== t.id);
    setNewTag('');
    updateCustmerItemTag({
      id: customer.id,
      tags: tagFiltered,
      isDetail,
    });
  };

  const handleSave = () => {
    const listTags = tags.map((t) => t.name);
    setNewTag('');
    toggle();
    const data = {
      login: customer?.login,
      payload: {
        tags: listTags,
      },
      onSuccess: () => {
        toast.dark(`[ ${customer?.firstName} ]'s tags updated!`);
      },
    };

    updateCustomerTagsAPI(data);
  };

  return (
    <PageModal isOpen={showEditTag} toggle={toggle} title={`[ ${customer?.firstName} ] Tags`} className={`customers__popup tags ${className}`}>
      <div className='tags__container'>
        <form onSubmit={handleSubmit} className='tags__form'>
          <div className='input-group'>
            <input className='tags__input form-control' onChange={handleChangeTag} value={newTag} placeholder='Naruto, dragon ball, one piece' type='text' name='tag' />
            <div className='input-group-append'>
              <button className='btn btn-outline-secondary tags__create' type='submit'>
                create
              </button>
            </div>
          </div>
        </form>

        <div className='tags__list'>
          {tags.map((tag) => (
            <div key={`customer__tag__modal__${tag.id}`} className='tags__item'>
              {tag.name}
              <button onClick={() => handleRemoveTag(tag)} type='button' className='tags__remove'>
                <span className='icon'>
                  <Close />
                </span>
              </button>
            </div>
          ))}
        </div>
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

const mapStateToProps = ({ customers, customerDetail }) => {
  const { showEditTag, userEditTag } = customers.ui;
  const { items } = customers.list;
  let customer = {};
  const isDetail = showEditTag && userEditTag === -1;
  if (isDetail) {
    customer = { ...customerDetail.data.customer, tags: customerDetail.data.customer.customerExtension?.tags || [] };
  } else if (showEditTag) {
    customer = items[userEditTag] || {};
  }
  return {
    showEditTag: showEditTag,
    customer,
    isDetail,
  };
};

const mapDispatchToProps = {
  updateCustmerEditTag: updateCustmerEditTagAction,
  updateCustmerItemTag: updateCustmerItemTagAction,
  updateCustomerTagsAPI: updateCustomerTagsAPIAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTagsModal);
