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
  ChartDataset,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { colorScheme } from 'utils/colorScheme';

interface UnitFormat extends ChartDataset<'line', { x: string | undefined; y: number }[]> {
  climate: boolean;
}
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

  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.units.value);

  const formatUnits = () => {
    const formatted: UnitFormat[] = units.reduce((acc: UnitFormat[], curr) => {
      if (
        !acc.find(
          (item: any) =>
            item.label ===
              `${curr.dimensions.length}x${curr.dimensions.width} ${
                curr.climate ? 'climate' : 'non-climate'
              }` && item.climate === curr.climate
        )
      ) {
        acc.push({
          label: `${curr.dimensions.length}x${curr.dimensions.width} ${
            curr.climate ? 'climate' : 'non-climate'
          }`,
          data: [
            {
              x: curr.createdAt?.split('T')[0],
              y: curr.price,
            },
          ],
          climate: curr.climate,
          borderColor: colorScheme.splice(Math.floor(Math.random() * colorScheme.length - 1), 1)[0],
          fill: false,
        });
      } else {
        acc
          .find(
            (item: any) =>
              item.label ===
                `${curr.dimensions.length}x${curr.dimensions.width} ${
                  curr.climate ? 'climate' : 'non-climate'
                }` && item.climate === curr.climate
          )
          ?.data.push({
            x: curr.createdAt?.split('T')[0],
            y: curr.price,
          });
      }
      return acc;
    }, []);
    setFormattedUnits(formatted);
    console.log(formattedUnits);
    setLoading(true);
  };

  useEffect(() => {
    async function getUnits() {
      const response = await fetch(
        'http://localhost:3000/api/units?facility=626010221a34c3c7d0b8b6d4',
        {
          mode: 'cors',
        }
      );
      const units = await response.json();
      dispatch(updateUnits(units.data));
    }
    getUnits();
  }, []);
  useEffect(() => {
    if (units) {
      formatUnits();
    }
  }, [units]);

  return (
    <>
      <h1>Facility Chart Test</h1>
      {loading && (
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
      )}
    </>
  );
};

export default Facility;
