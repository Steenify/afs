import React from 'react';
import { connect } from 'react-redux';

const WorkflowDescriptionCell = ({ description }) => {
  return <div className='workflows__description workflows__cell'>{description}</div>;
};

const mapStateToProps = ({ workflows }, ownProps) => {
  const { data } = ownProps;
  const { items } = workflows.data;
  const item = items[data] || {};
  return {
    description: item?.description || 'N/A',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowDescriptionCell);
