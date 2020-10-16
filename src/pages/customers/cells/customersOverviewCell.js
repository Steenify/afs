import React from 'react';
import { connect } from 'react-redux';

const CustomersOverviewCell = ({ email, phonePrefix, phoneNumber, fbUrl, igUrl }) => {
  return (
    <div className={`customers__overview`}>
      <div className='customers__link'>{email}</div>
      <div className='customers__link'>
        {phonePrefix} {phoneNumber}
      </div>
      {fbUrl && <div className='customers__link'>{fbUrl}</div>}
      {igUrl && <div className='customers__link'>{igUrl}</div>}
    </div>
  );
};

const mapStateToProps = ({ customers }, ownProps) => {
  const { data } = ownProps;
  const { items } = customers.list;
  const item = items[data] || {};

  return {
    email: item?.email,
    phonePrefix: item?.phonePrefix,
    phoneNumber: item?.phoneNumber,
    fbUrl: item?.fbUrl,
    igUrl: item?.igUrl,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersOverviewCell);
