import React from 'react';
import { isString } from 'lodash';

const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        {props.columns.map((column) => {
          const { Header } = column;
          const style = Object.assign({}, column.style || {}, {
            minWidth: column.minWidth || 0,
          });

          return (
            <th
              className={column.className || ''}
              style={style}
              key={`table__header__item__${column.accessor}`}>
              {isString(Header) ? Header : <Header />}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default React.memo(TableHeader);
