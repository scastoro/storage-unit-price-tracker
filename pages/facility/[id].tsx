import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { updateUnits } from 'features/units/unitsSlice';
import { NextPage } from 'next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatUnits } from 'utils/formatUnits';
import { formatUnitsTable } from 'utils/formatUnitsTable';
import { TableUnit, UnitFormat } from 'types/types';
import UnitTable from 'components/Tables/UnitTable';
import { getColumns } from 'components/Tables/getColumns';
import { Column } from 'react-table';
import { formatUnitsDate } from 'utils/formatUnitsDate';

const Facility: NextPage = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LogarithmicScale,
    Title,
    Tooltip,
    Legend
  );
  const [loading, setLoading] = useState(false);
  const [formattedUnits, setFormattedUnits] = useState<UnitFormat[]>([]);
  const [tableUnits, setTableUnits] = useState<TableUnit[]>([]);
  const [unitColumns, setUnitColumns] = useState<Column[]>([]);
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.units.value);
  const facilities = useAppSelector((state) => state.facilities.value);

  useEffect(() => {
    setLoading(true);
    async function getUnits() {
      const url = process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000';
      const response = await fetch(`https://${url}/api/units?facility=${id}`, {
        mode: 'cors',
      });
      const units = await response.json();
      dispatch(updateUnits(units.data));
    }
    if (id) {
      getUnits();
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (units) {
      setFormattedUnits(formatUnits(units));
      setTableUnits(formatUnitsDate(units));
    }
  }, [units]);

  useEffect(() => {
    if (tableUnits.length > 0) {
      setUnitColumns(getColumns(tableUnits));
      setLoading(false);
    }
  }, [tableUnits]);

  return (
    <section className='m-auto w-4/5'>
      <h1 className='text-3xl underline mb-5'>
        {facilities.find((facility) => facility._id === id)?.name}
      </h1>
      <section className='table-container mb-10'>
        {!loading && <UnitTable units={tableUnits} tableColumns={unitColumns} />}
      </section>{' '}
      {!loading && (
        <section style={{ width: '65%', marginBottom: '30px' }} className='chart-container'>
          <Line
            options={{
              responsive: true,
              // interaction: {
              //   intersect: false,
              //   mode: 'index',
              // },
              scales: {
                y: {
                  type: 'logarithmic',
                  ticks: {},
                },
              },
            }}
            data={{
              datasets: formattedUnits,
            }}
          />
        </section>
      )}
    </section>
  );
};

export default Facility;
