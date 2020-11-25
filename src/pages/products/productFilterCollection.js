import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import { updateProductFiltersAction } from './actions';
import { actionTryCatchCreator } from 'utils';
import { getProductCollectionService } from 'services/product';

const ProductFilterCollection = ({ selectedCollection, updateProductFiltersAction }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const handleChangeStatus = (event) => {
    const { target } = event;
    const collection = target.getAttribute('data');
    updateProductFiltersAction({
      selectedCollection: collection,
      page: 0,
    });
  };

  useEffect(() => {
    actionTryCatchCreator({
      service: getProductCollectionService(),
      onSuccess: (data) => {
        setCollections(data || []);
      },
    });
  }, []);

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      transitionDuration={0.000001}
      padding={10}
      onClickOutside={toggle}
      content={() => (
        <div className='order__filter inside_popover'>
          <div className='list_status'>
            <button data='' onClick={handleChangeStatus} key={`list__status_option__all`} className={`status ${!selectedCollection && 'active'}`}>
              All
            </button>
            {collections.map((sta) => (
              <button data={sta.id} onClick={handleChangeStatus} key={`list__status_option__${sta.id}`} className={`status  ${sta.name} ${selectedCollection == sta.id && 'active'}`}>
                {sta.name}
              </button>
            ))}
          </div>
        </div>
      )}>
      <button onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='filter__toggle middle'>
        <span className='dispaly_name'>{collections.find((s) => s.id == selectedCollection)?.name || 'Collection'}</span>
        <span className='icon mb-1 ml-2'>
          <Cavet />
        </span>
      </button>
    </Popover>
  );
};

const mapStateToProps = ({ products }) => {
  return {
    selectedCollection: products.filter.selectedCollection,
  };
};

const mapDispatchToProps = { updateProductFiltersAction };

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilterCollection);
