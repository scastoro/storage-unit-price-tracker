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
import { TableUnit, Unit, UnitFormat } from 'types/types';
import UnitTable from 'components/Tables/UnitTable';
import { getColumns } from 'components/Tables/getColumns';
import { Column } from 'react-table';
import { formatUnitsDate } from 'utils/formatUnitsDate';
import { sub, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import ViewToggle from 'components/utils/Toggle';
import Sidebar from 'components/layout/Sidebar';

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
  const [display, setDisplay] = useState('Table');
  const [formattedUnits, setFormattedUnits] = useState<UnitFormat[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>([]);
  const [tableUnits, setTableUnits] = useState<TableUnit[]>([]);
  const [unitColumns, setUnitColumns] = useState<Column[]>([]);
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.units.value);
  const facilities = useAppSelector((state) => state.facilities.value);
  const unitSizes = useAppSelector((state) => state.unitSizes.value);

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
    }
  }, [id, dispatch, date]);

  // Create new effect to allow selecting unit sizes
  // New selected units variable will be passed to formatted units
  // instead of just the units variable
  useEffect(() => {
    if (units && unitSizes) {
      const filteredUnits = units.filter((unit) => {
        const match = unitSizes.find((unitSize) => {
          return (
            unit.dimensions.length === unitSize.dimensions.length &&
            unit.dimensions.width === unitSize.dimensions.width &&
            unit.climate === unitSize.climate &&
            unitSize.selected
          );
        });

        if (match) {
          return unit;
        }
      });
      setSelectedUnits(filteredUnits);
    }
  }, [units, unitSizes]);

  useEffect(() => {
    if (selectedUnits) {
      setFormattedUnits(formatUnits(selectedUnits));
      setTableUnits(formatUnitsDate(selectedUnits));
    }
  }, [selectedUnits]);

  useEffect(() => {
    if (tableUnits.length > 0) {
      setUnitColumns(getColumns(tableUnits));
      setLoading(false);
    }
  }, [tableUnits]);

  return (
    <>
      <section className='m-auto w-11/12 flex'>
        <Sidebar>
          <section className='datepicker-container flex-col'>
            <div>
              <h2>Choose start date:</h2>
              <DatePicker
                selected={new Date(date)}
                onChange={(date: Date) => setDate(format(date, 'yyyy-MM-dd'))}
              />
            </div>
            <ViewToggle optionSelected={(e) => setDisplay(e.target.value)} />
          </section>
        </Sidebar>
        <section className='flex-1'>
          <h1 className='text-3xl underline mb-5'>
            {facilities.find((facility) => facility._id === id)?.name}
          </h1>
          <section className='table-container mb-10'>
            {!loading && display === 'Table' ? (
              <UnitTable units={tableUnits} tableColumns={unitColumns} />
            ) : null}
          </section>{' '}
          {!loading && display === 'Chart' ? (
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
        ) : null}
        </section>
      </section>
    </>
  );
};

export default Facility;
