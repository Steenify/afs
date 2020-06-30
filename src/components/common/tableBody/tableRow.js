import React from 'react';

const TableRow = ({ columns, item, cellProps, getRowProps }) => {
  return (
    <tr key={`table__body__item__${item}`} {...getRowProps(item)}>
      {columns.map((column) => {
        const { Cell } = column;
        const style = Object.assign({}, column.style || {}, {
          minWidth: column.minWidth || 0,
        });
        return (
          <td
            className={`${column.className || ''}`}
            style={style}
            key={`table__row__item__${item + column.accessor}`}>
            <Cell data={item} {...cellProps} />
          </td>
        );
      })}
    </tr>
  );
};

TableRow.defaultProps = {
  cellProps: {},
  getRowProps: () => ({}),
};

export default TableRow;
