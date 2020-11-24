import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';

const WorkflowNameCell = ({ id, name }) => {
  return (
    <Button tag={Link} className='w-100 justify-content-start workflows__name workflows__cell pl-0' to={`/workflows/${id}`} color='link'>
      {name}
    </Button>
  );
};

const mapStateToProps = ({ workflows }, ownProps) => {
  const { data } = ownProps;
  const { items } = workflows.data;
  const item = items[data] || {};
  return {
    id: item?.id || '',
    name: item?.name || '',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowNameCell);
