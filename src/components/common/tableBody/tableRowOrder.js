import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

const TableRowOrder = ({ columns, item, cellProps, getRowProps, data }) => {
  return (
    <tr key={`table__body__item__${item}`} {...getRowProps(data || {})}>
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
  const { item, reducer = 'orders' } = ownProps;
  const data = get(reducers, `orderTable.${reducer}.table.items`)?.[item];
  return {
    data,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TableRowOrder));
