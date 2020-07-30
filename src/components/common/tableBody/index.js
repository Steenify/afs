import React from 'react';
import TableRow from './tableRow';
import TableRowOrder from './tableRowOrder';

const RowMap = {
  TableRow: TableRow,
  TableRowOrder: TableRowOrder,
};

const TableBody = ({ data, columns, cellProps, getRowProps, rowName, reducerPath }) => {
  const Row = RowMap[rowName];
  return (
    <tbody>
      {data.map((item) => (
        <Row key={`table__body__${item}`} columns={columns} cellProps={{ ...cellProps, reducerPath }} getRowProps={getRowProps} item={item} reducerPath={reducerPath} />
      ))}
    </tbody>
  );
};

TableBody.defaultProps = {
  rowName: 'TableRow',
};

export default React.memo(TableBody);
