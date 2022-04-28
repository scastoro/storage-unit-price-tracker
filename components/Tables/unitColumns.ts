import { ColumnWithLooseAccessor, Column } from 'react-table';

export const COLUMNS: Column[] = [
  {
    Header: 'Dimensions',
    accessor: 'dimensions',
  },
  {
    Header: 'Price',
    accessor: 'price',
  },
  {
    Header: 'Climate?',
    accessor: 'climate',
  },
  {
    Header: 'Promotion',
    accessor: 'promotion',
  },
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    Header: 'Size',
    accessor: 'size',
  },
];
