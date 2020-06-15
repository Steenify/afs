import React from 'react';
import './style.scss';

// columns: array

const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        {props.columns.map((column) => (
          <th style={column.style || {}} key={column.key}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
