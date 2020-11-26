import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { PERMITTIONS_CONFIG } from 'configs';

import { formatMoney, formatNumber } from 'utils';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { updateOrderTableSelectedOrderBudgetAction } from 'components/tables/orders/actions';

const OrderBudgetCell = ({ budget, accountInfo, item, reducer, updateOrderTableSelectedOrderBudget }) => {
  const handleEdit = () => {
    updateOrderTableSelectedOrderBudget({ payload: { isOpenEditBudget: true, selectedOrder: item }, reducer });
  };
  if (!accountInfo) {
    return '';
  }

  if (!accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.MODIFY_BUDGET)) {
    return <div className=''>{formatMoney(budget)}</div>;
  }

  return (
    <button onClick={handleEdit} className='order__toggle order__user text-left w-100'>
      <div className='d-flex justify-content-end'>
        <span className='icon d-block mr-1'>
          <Pencil width='14px' height='14px' />
        </span>
        {formatNumber(budget || 0)}$
      </div>
    </button>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { auth } = reducers;
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  return {
    item: item,
    budget: item?.budget || 0,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  updateOrderTableSelectedOrderBudget: updateOrderTableSelectedOrderBudgetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBudgetCell);
