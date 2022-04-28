import { ColumnWithLooseAccessor, Column } from 'react-table';

export const COLUMNS: Array<Column> = [
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
  {
    Header: 'Facility',
    accessor: 'facility',
  },
];
