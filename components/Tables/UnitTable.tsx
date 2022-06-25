import React, { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { TableUnit, Unit } from '../../types/types';

interface Props {
  units: Unit[] | TableUnit[];
  tableColumns: Column[];
}

function UnitTable({ units, tableColumns }: Props) {
  const columns: Column[] = useMemo(() => tableColumns, []);
  const data = useMemo(() => units, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
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
        {rows.map((row) => {
          prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-key
            <tr className='border' {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <td className='border' {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UnitTable;
