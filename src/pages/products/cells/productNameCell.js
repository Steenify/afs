import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';

const ProductNameCell = ({ id, name }) => {
  return (
    <Button tag={Link} className='w-100 justify-content-start products__name products__cell pl-0' to={`/products/${id}`} color='link'>
      {name}
    </Button>
  );
};

const mapStateToProps = ({ products }, ownProps) => {
  const { data } = ownProps;
  const { items } = products.data;
  const item = items[data] || {};
  return {
    id: item?.id || '',
    name: item?.name || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductNameCell);
