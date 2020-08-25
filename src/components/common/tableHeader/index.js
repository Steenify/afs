import React from 'react';
import { isString } from 'lodash';
import Sticky from 'react-stickynode';

const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        {props.columns.map((column) => {
          const { Header, headerProps } = column;
          const style = Object.assign({}, column.style || {}, {
            minWidth: column.minWidth || 0,
          });

          return (
            <th className={column.className || ''} style={style} key={`table__header__item__${column.accessor}`}>
              <Sticky innerClass='z-index-999' top={57}>
                <div className='th_content'>{isString(Header) ? Header : <Header {...headerProps} />}</div>
              </Sticky>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default React.memo(TableHeader);
