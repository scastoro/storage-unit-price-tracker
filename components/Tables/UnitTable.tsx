import React, { useMemo } from 'react';
import { Column, usePagination, useTable } from 'react-table';
import { TableUnit, Unit } from '../../types/types';

interface Props {
  units: Unit[] | TableUnit[];
  tableColumns: Column[];
}

function UnitTable({ units, tableColumns }: Props) {
  const columns: Column[] = useMemo(() => tableColumns, [tableColumns]);
  const data = useMemo(() => units, [units]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 25
      }
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    nextPage,
    previousPage,
    prepareRow,
    state,
    pageOptions,
    canNextPage,
    canPreviousPage,
    visibleColumns,
    gotoPage,
    pageCount,
    setPageSize,
    exportData,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <>
      <table className='border' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th className='border border-slate-600 text-sm' {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {page.map((row) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr className='border' {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td className='border text-center' {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );

          })}
          {/* Generate row w/ extra space if number of rows is less than pageSize */}
          {page.length < pageSize && pageIndex > 1 && (
            <tr style={{ height: `${(pageSize - page.length) * 27}px` }}></tr>
          )}
        </tbody>
      </table>
      <div className='flex gap-5 items-end mt-5'>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            className='w-7 border-2 border-slate-500 rounded'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
        <select
          className='border'
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button
          className='disabled:opacity-50 disabled:bg-transparent disabled:border disabled:border-blue-500 disabled:text-blue-700 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          First
        </button>
        <button
          className='disabled:opacity-50 disabled:bg-transparent disabled:border disabled:border-blue-500 disabled:text-blue-700 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          className='disabled:opacity-50 disabled:bg-transparent disabled:border disabled:border-blue-500 disabled:text-blue-700 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
        <button
          className='disabled:opacity-50 disabled:bg-transparent disabled:border disabled:border-blue-500 disabled:text-blue-700 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          Last
        </button>
      </div>
    </>
  );
}

export default UnitTable;
