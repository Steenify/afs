import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.key);
  };

  render() {
    const { data, columns } = this.props;

    if (data.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length}>Not found.</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={item.id + column.key}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
