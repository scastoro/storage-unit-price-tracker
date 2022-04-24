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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const Facility: NextPage = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.units.value);
  console.log(units);
  useEffect(() => {
    async function getUnits() {
      const response = await fetch(
        'http://localhost:3000/api/units?facility=625ebf06cffcf740f283a6dc',
        {
          mode: 'cors',
        }
      );
      const units = await response.json();
      dispatch(updateUnits(units.data));
      console.log(units);
      setLoading(true);
    }
    getUnits();
  }, []);

  return (
    <>
      <h1>Facility Chart Test</h1>
      {loading && (
        <Line
          options={{ responsive: true }}
          data={{
            labels: ['test1', 'test2', 'test3', 'test4', 'test5'],
            datasets: [
              {
                label: '5x5 Unit',
                data: [
                  units[0].price,
                  units[4].price,
                  units[5].price,
                  units[7].price,
                  units[11].price,
                ],
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default Facility;
