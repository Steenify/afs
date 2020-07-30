import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

const TableRowOrder = ({ columns, item, cellProps, getRowProps, data }) => {
  return (
    <tr key={`table__body__item__${item}`} {...getRowProps(data)}>
      {columns.map((column) => {
        const { Cell } = column;
        const style = Object.assign({}, column.style || {}, {
          minWidth: column.minWidth || 0,
        });
        return (
          <td className={`${column.className || ''}`} style={style} key={`table__row__item__${item + column.accessor}`}>
            <Cell data={item} {...cellProps} {...column.cellProps} />
          </td>
        );
      })}
    </tr>
  );
};

TableRowOrder.defaultProps = {
  cellProps: {},
  getRowProps: () => ({}),
};

const mapStateToProps = (reducers, ownProps) => {
  const { item, reducerPath = 'order' } = ownProps;
  const reducer = get(reducers, reducerPath) || {};
  const items = get(reducer, 'table.items') || {};
  const data = items[item] || {};
  return {
    data,
  };
};

// const mapStateToProps = ({ order }, ownProps) => {
//   const { item } = ownProps;
//   const { items } = order.list;
//   const data = items[item] || {};
//   return {
//     data,
//   };
// };

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TableRowOrder));
