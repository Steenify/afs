import React from 'react';
import { connect } from 'react-redux';

import CustomersFilters from './customersFilters';
import CustomersListTable from './customersListTable';
import CustomersPaging from './customersPaging';

const CustomerList = (props) => {
  return (
    <div className='customers__page'>
      <div className='customers__header box'>
        <CustomersFilters />
      </div>
      <div className='customers__body'>
        <CustomersListTable />
      </div>
      <div className='customers__paging'>
        <CustomersPaging />
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(CustomerList);
