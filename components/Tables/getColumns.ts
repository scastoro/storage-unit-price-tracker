import { Column } from 'react-table';

export function getColumns(row: object[]): Column[] {
  row.sort(function (a, b) {
    return Object.keys(b).length - Object.keys(a).length;
  });
  return Object.keys(row[0]).map((key) => ({
    Header: key,
    accessor: key,
  }));
}
