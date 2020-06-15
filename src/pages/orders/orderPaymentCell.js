import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownToggle, Dropdown } from 'reactstrap';
import Button from 'components/common/button';
import { connect } from 'react-redux';
import { map } from 'lodash';

import { formatMoney } from 'utils';

import { PERMITTIONS_CONFIG, mapStatusPayment, statusPayments } from 'config';

const OrderPaymentCell = ({
  row: { index, original },
  column: { id },
  updateCell,
  accountInfo,
}) => {
  const { artistPaymentStatus } = original;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const onSave = (value) => {
    updateCell(index, id, value, original);
    toggle();
  };

  if (!accountInfo) {
    return '';
  }

  // if (
  //   !accountInfo?.permissions?.includes(
  //     PERMITTIONS_CONFIG.UPDATE_PAYMENT_STATUS,
  //   )
  // ) {
  return (
    <span
      className={`order__status ${artistPaymentStatus || statusPayments[1]}`}>
      {mapStatusPayment[artistPaymentStatus] || mapStatusPayment.UNPAID}
    </span>
  );
  // }

  // return (
  //   <Dropdown isOpen={dropdownOpen} toggle={toggle}>
  //     <DropdownToggle className='order__toggle p-0'>
  //       <div className='d-flex '>
  //         <span
  //           className={`order__status ${
  //             artistPaymentStatus || mapStatusPayment.UNPAID
  //           }`}>
  //           {mapStatusPayment[artistPaymentStatus] || mapStatusPayment.UNPAID}
  //         </span>
  //       </div>
  //     </DropdownToggle>
  //     <DropdownMenu className='order__dropdowns order__payment'>
  //       <div className='order__payment__wrapper'>
  //         <div className='list m-0 w-100'>
  //           {map(mapStatusPayment, (status, key) => (
  //             <button
  //               onClick={() => onSave(key)}
  //               key={`list__artist__${key}`}
  //               className={`status__select p-0`}>
  //               <span className={`order__status ${key}`}>
  //                 {mapStatusPayment[key] || mapStatusPayment.UNPAID}
  //               </span>
  //             </button>
  //           ))}
  //         </div>
  //       </div>
  //     </DropdownMenu>
  //   </Dropdown>
  // );
};

const mapStateToProps = ({ order, auth }) => ({
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentCell);
