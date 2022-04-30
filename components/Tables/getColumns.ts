import { Column } from 'react-table';

export function getColumns(row: object): Column[] {
  return Object.keys(row).map((key) => ({
    Header: key,
    accessor: key,
  }));
}
