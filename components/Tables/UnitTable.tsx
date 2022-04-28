import React, { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { Unit } from '../../types/types';
import { COLUMNS } from './unitColumns';

interface Props {
  units: Unit[];
}

function UnitTable({ units }: Props) {
  const columns: Array<Column> = useMemo(() => COLUMNS, []);
  const data = useMemo(() => units, []);

  useTable({
    columns: columns,
    data: data,
  });
  return <div>UnitTable</div>;
}

export default UnitTable;
