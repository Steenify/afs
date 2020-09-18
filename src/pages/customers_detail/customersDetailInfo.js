import React, { useState } from 'react';

import CustomerDetailInfoDisplay from './customersDetailInfoDisplay';
import CustomersDetailEditForm from './customersDetailEditForm';

const CustomerDetailInfo = (props) => {
  const { customer } = props;
  const [updating, setUpdating] = useState(false);

  return updating ? <CustomersDetailEditForm setUpdating={setUpdating} /> : <CustomerDetailInfoDisplay customer={customer} setUpdating={setUpdating} />;
};

export default CustomerDetailInfo;
