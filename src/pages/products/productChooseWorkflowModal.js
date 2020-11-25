import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import { filter, debounce, map } from 'lodash';
import { toast } from 'react-toastify';

import PageModal from 'components/common/pageModal';
import Button from 'components/common/button';

import { getOrderItem, getOrderOption, formatMoney, actionTryCatchCreator, mapDataByIds } from 'utils';
import { getWorkflowListService } from 'services/workflow.service';
import InPageLoading from 'components/common/inPageLoading';
import { applyWorkflowForProductService } from 'services/product';
import { getProductsAction } from './actions';

const ProductChooseWorkflowModal = (props) => {
  const { isOpen, className, toggle, selectedProducts, getProductsAction } = props;

  const [workflow, setWorkflow] = useState();
  const [loading, setLoading] = useState(false);
  const [failedProducts, setFailedProducts] = useState([]);

  const handleSubmit = () => {
    const params = { flowId: workflow.value, productIds: selectedProducts.map((i) => i.id) };
    actionTryCatchCreator({
      service: applyWorkflowForProductService(params),
      onPending: () => setLoading(true),
      onSuccess: (data) => {
        setLoading(false);
        if (data.fail?.length > 0) {
          setFailedProducts(data.fail);
        } else {
          toast.dark('Applied workflow to selected products');
          toggle();
          getProductsAction();
        }
      },
      onError: () => setLoading(false),
    });
  };

  const onConfirmFailedProducts = () => {
    setFailedProducts([]);
    toggle();
    getProductsAction();
  };

  const loadWorkflowOptions = (inputValue, callback) => {
    actionTryCatchCreator({
      service: getWorkflowListService({ s: inputValue }),
      onSuccess: (data) => {
        const result = (data || []).map((i) => ({ value: i.id, label: i.name }));
        callback(result);
      },
    });
  };

  return (
    <PageModal size='md' isOpen={isOpen} toggle={toggle} title='Apply workflow' className={`artists__payout ${className}`}>
      {failedProducts.length === 0 ? (
        <div className='payout__list row'>
          <div className='col-12 mt-4 mb-4'>
            <AsyncSelect cacheOptions defaultOptions loadOptions={debounce(loadWorkflowOptions, 500)} onChange={setWorkflow} />
          </div>
          <div className='payout__item action col mt-3'>
            <div className='left'>
              <Button color='normal' onClick={toggle} type='button'>
                Cancel
              </Button>
            </div>
            <div className='right'>
              <Button onClick={handleSubmit} disabled={!workflow} color='primary' type='button'>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className='payout__list row'>
          <div className='col-12 mt-4'>
            <p>
              <h5>Failed to apply workflow for these products:</h5>
            </p>

            {failedProducts.map((fp) => (
              <p key={fp.id}>- {fp.name}</p>
            ))}
          </div>
          <div className='payout__item justify-content-center col mt-3'>
            <Button color='normal' onClick={onConfirmFailedProducts} type='button'>
              OK
            </Button>
          </div>
        </div>
      )}

      <InPageLoading isLoading={loading} />
    </PageModal>
  );
};

const mapStateToProps = ({ products, auth }) => {
  const { items } = products.data;
  const selectedProducts = filter(items, (a) => a.selected) || [];
  return {
    accountInfo: auth.data.accountInfo,
    selectedProducts,
  };
};

const mapDispatchToProps = { getProductsAction };

export default connect(mapStateToProps, mapDispatchToProps)(ProductChooseWorkflowModal);
