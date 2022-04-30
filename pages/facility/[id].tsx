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
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.units.value);
  const facilities = useAppSelector((state) => state.facilities.value);

  useEffect(() => {
    setLoading(true);
    async function getUnits() {
      const response = await fetch(`http://localhost:3000/api/units?facility=${id}`, {
        mode: 'cors',
      });
      const units = await response.json();
      dispatch(updateUnits(units.data));
    }
    getUnits();
  }, [id, dispatch]);

  useEffect(() => {
    if (units) {
      setFormattedUnits(formatUnits(units));
      setTableUnits(formatUnitsTable(units));
      setLoading(false);
    }
  }, [units]);

  return (
    <>
      <h1>Facility Chart Test</h1>
      <h2>{facilities.find((facility) => facility._id === id)?.name}</h2>
      {!loading && (
        <section style={{ width: '50%' }} className='chart-container'>
          <Line
            options={{
              responsive: true,
              interaction: {
                intersect: false,
                mode: 'index',
              },
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
    </>
  );
};

export default Facility;
