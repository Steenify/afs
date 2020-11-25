import React from 'react';
import { connect } from 'react-redux';

const ProductFlowCell = ({ flowId }) => {
  return <div className='workflows__flowId products__cell'>{flowId}</div>;
};

const mapStateToProps = ({ products }, ownProps) => {
  const { data } = ownProps;
  const { items } = products.data;
  const item = items[data] || {};
  return {
    flowId: item?.flowId || 'N/A',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductFlowCell);
