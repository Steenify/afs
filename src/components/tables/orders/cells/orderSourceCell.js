import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
const MapSource = {
  TURNED_HUMAN: 'TURNED HUMAN',
  TURNED_NINJA: 'TURNED NINJA',
};

const OrderSourceCell = ({ goToDetail, code, source }) => {
  const message = MapSource[source];

  return (
    <div onClick={() => goToDetail(code)} className={`order__created_date cursor-pointer`}>
      <div className=''>{message}</div>
    </div>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  return {
    source: item?.source,
    code: item?.code,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSourceCell);
