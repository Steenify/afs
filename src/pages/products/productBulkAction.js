import React, { useState } from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import Sticky from 'react-stickynode';

import ProductSelectedAllCell from './cells/productSelectedAllCell';
import ProductChooseWorkflowModal from './productChooseWorkflowModal';

const ProductBulkAction = (props) => {
  const { selected } = props;
  const isHide = !selected || !selected?.length;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const canApplyWorkflow = true;

  return (
    <div className={`order__bulk`} style={{ opacity: isHide ? 0 : 1 }}>
      <Sticky innerClass='overflow-auto' top={57}>
        <div className='wrapper'>
          <div className='btn-group'>
            <div className='btn btn-group__item d-flex align-items-center '>
              <div className='d-flex align-items-center order__bulk__selected'>
                <ProductSelectedAllCell />
                <span className='number'>{selected?.length} selected</span>
              </div>
            </div>
            {canApplyWorkflow && (
              <button type='button' className='btn btn-group__item' onClick={toggle}>
                Choose Workflow
              </button>
            )}
          </div>
        </div>
      </Sticky>
      <ProductChooseWorkflowModal isOpen={isOpen} toggle={toggle} />
    </div>
  );
};

const mapStateToProps = ({ products, auth }) => {
  const { items } = products.data;
  const selected = filter(items, (or) => or.selected);
  return {
    accountInfo: auth.data.accountInfo,
    selected,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBulkAction);
