import { Column } from 'react-table';

export const COLUMNS: Column[] = [
  {
    Header: 'Dimensions',
    accessor: 'dimensions',
    Cell: ({ value }) => `${value.length}'x${value.width}'`,
  },
  {
    Header: 'Price',
    accessor: 'price',
    Cell: ({ value }) => `$ ${value}`,
  },
  {
    Header: 'Climate?',
    accessor: 'climate',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Promotion',
    accessor: 'promotion',
    Cell: ({ value }) => (value ? value?.toString() : 'None'),
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
    Cell: ({ value }) => value.name,
  },
];
