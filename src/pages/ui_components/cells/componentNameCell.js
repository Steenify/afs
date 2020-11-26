import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';

const ComponentNameCell = ({ id, name }) => {
  return (
    <Button tag={Link} className='w-100 justify-content-start uiComponents__name uiComponents__cell pl-0' to={`/ui-components/${id}`} color='link'>
      {name}
    </Button>
  );
};

const mapStateToProps = ({ uiComponents }, ownProps) => {
  const { data } = ownProps;
  const { items } = uiComponents.data;
  const item = items[data] || {};
  return {
    id: item?.id || '',
    name: item?.name || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentNameCell);
