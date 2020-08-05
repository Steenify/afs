import React from 'react';
import TableRow from './tableRow';
import TableRowOrder from './tableRowOrder';

const RowMap = {
  TableRow: TableRow,
  TableRowOrder: TableRowOrder,
};

const TableBody = ({ data, columns, cellProps, getRowProps, rowName, reducer }) => {
  const Row = RowMap[rowName];
  return (
    <tbody>
      {data.map((item) => (
        <Row key={`table__body__${item}`} columns={columns} cellProps={{ reducer, ...cellProps }} getRowProps={getRowProps} item={item} reducer={reducer} />
      ))}
    </tbody>
  );
};

TableBody.defaultProps = {
  rowName: 'TableRow',
};

export default React.memo(TableBody);
