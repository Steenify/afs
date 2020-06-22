/* @flow */
import React from 'react';
import { useFlexLayout, useTable, useSortBy, usePagination } from 'react-table';
import first from 'lodash/first';

import Paging from 'components/common/paging';

import { ReactComponent as SortUpIcon } from 'assets/img/sortup.svg';
import { ReactComponent as SortDownIcon } from 'assets/img/sortdown.svg';
import { ReactComponent as SortIcon } from 'assets/img/sort.svg';

import './style.scss';

const sizePerPage = [100, 30, 40];

const WHITE_LIST_HEADER_SORT = ['action', 'edit', 'selection'];

const defaultPropGetter = () => ({});

const DataTable = (props) => {
  const {
    data,
    columns,
    serverSide,
    totalPage = 0,
    selectPageSize,
    getTrProps,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    // getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
    onLoad,
    className,
    goToDetail,
  } = props;

  const defaultColumn = React.useMemo(
    () => ({
      width: undefined,
      minWidth: 0,
    }),
    [],
  );

  const size = first(sizePerPage) || 50;

  const [perPageSize, setPerPageSize] = React.useState(size);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // Paging
    page,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data: data || [],
      defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: perPageSize,
        sortBy: props.sortBy || [],
      },
      manualPagination: serverSide,
      manualSortBy: serverSide,
      pageCount: serverSide
        ? typeof totalPage === 'function'
          ? totalPage(perPageSize)
          : totalPage
        : Math.floor(data.length / perPageSize) + 1,
      autoResetSortBy: false,
      // autoResetPage: false,
      goToDetail,
    },
    useFlexLayout,
    useSortBy,
    usePagination,
  );

  React.useEffect(() => {
    if (onLoad) {
      onLoad({
        page: pageIndex,
        size: pageSize,
        sortBy: sortBy || [],
      });
    }
  }, [pageIndex, pageSize, sortBy]);

  return (
    <>
      {selectPageSize && (
        <div className='d-flex align-items-center justify-content-center justify-content-md-end mb-3 mt-3'>
          <div>
            Showing {page.length} of ~{pageCount * pageSize}
          </div>
          <div>
            <select
              className='form-control form-control-sm mx-1'
              onChange={(e) => {
                setPageSize(e.target.value);
                setPerPageSize(e.target.value);
              }}>
              {sizePerPage.map((size, i) => (
                <option value={size} key={i}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div
        className={[
          'table-responsive',
          'bg-light',
          'steenify-table',
          className ? className : '',
        ]
          .join(' ')
          .trim()}>
        <table {...getTableProps()} className='table'>
          {/* TABLE HEADER */}
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, j) => {
                  const cantSort = [
                    ...WHITE_LIST_HEADER_SORT,
                    ...(props.whiteListSort || []),
                  ]
                    .map((item) => `header_${item}`)
                    .includes(column.getHeaderProps().key);

                  return (
                    <th
                      width={column.width}
                      {...column.getHeaderProps([
                        {
                          className: column.className,
                          style: column.style,
                        },
                        cantSort ? {} : column.getSortByToggleProps(),
                        getHeaderProps(column),
                      ])}
                      key={j}
                      scope='col'>
                      <div className='d-flex'>
                        {column.render('Header')}
                        {!cantSort && (
                          <span className='ml-1'>
                            {column.canSort ? (
                              column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon />
                                ) : (
                                  <SortUpIcon />
                                )
                              ) : (
                                <SortIcon />
                              )
                            ) : null}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* TABLE BODY */}
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);

              let baseProps = { ...row.getRowProps() };

              if (getTrProps) {
                baseProps = {
                  ...baseProps,
                  ...getTrProps(baseProps, { ...row }),
                };
              }

              return (
                <tr {...baseProps} key={i}>
                  {row.cells.map((cell, j) => (
                    <td
                      {...cell.getCellProps([
                        {
                          className: cell.column.className,
                          style: cell.column.style,
                        },
                        getColumnProps(cell.column),
                        getCellProps(cell),
                      ])}
                      key={j}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* TABLE PAGING */}
      <div className='d-flex justify-content-center'>
        <Paging
          items={pageCount}
          activePage={pageIndex + 1}
          onSelect={(activePage) => gotoPage(activePage - 1)}
        />
      </div>
    </>
  );
};

DataTable.defaultProps = {
  totalPage: 0,
  goToDetail: () => {},
};

export default DataTable;
