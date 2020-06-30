import React from 'react';
import TableRow from './tableRow';
import TableRowOrder from './tableRowOrder';

const RowMap = {
  TableRow: TableRow,
  TableRowOrder: TableRowOrder,
};

const TableBody = ({ data, columns, cellProps, getRowProps, rowName }) => {
  const Row = RowMap[rowName];
  return (
    <tbody>
      {data.map((item) => (
        <Row
          key={`table__body__${item}`}
          columns={columns}
          cellProps={cellProps}
          getRowProps={getRowProps}
          item={item}
        />
      ))}
    </tbody>
  );
};

TableBody.defaultProps = {
  rowName: 'TableRow',
};

export default TableBody;
