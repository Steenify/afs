import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';
import ComponentEditModal from '../componentEditModal';

const ComponentNameCell = ({ item }) => {
  const { id, name } = item;
  return (
    <div className='d-flex'>
      <Button tag={Link} className='w-100 justify-content-start uiComponents__name uiComponents__cell pl-0' to={`/ui-components/${id}`} color='link'>
        {name}
      </Button>
      <ComponentEditModal item={item} containerClassName='ml-auto' form={`ComponentEditModal_${id}`} />
    </div>
  );
};

const mapStateToProps = ({ uiComponents }, ownProps) => {
  const { data } = ownProps;
  const { items } = uiComponents.data;
  const item = items[data] || {};
  return { item };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentNameCell);
