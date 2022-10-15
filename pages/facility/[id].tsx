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
import { sub, format } from 'date-fns';
import DatePicker from 'react-datepicker';

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
  const [date, setDate] = useState(format(sub(new Date(), { months: 4 }), 'yyyy-MM-dd'));
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
      const response = await fetch(`/api/units?facility=${id}&createdAt>${date}&sort=-createdAt`, {
        mode: 'cors',
      });
      const units = await response.json();
      dispatch(updateUnits(units.data));
    }
    if (id) {
      getUnits();
      console.log(date);
    }
  }, [id, dispatch, date]);

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
    <>
      <DatePicker
        selected={new Date(date)}
        onChange={(date: Date) => setDate(format(date, 'yyyy-MM-dd'))}
      />
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
    </>
  );
};

export default Facility;
