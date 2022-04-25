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
import { Unit } from 'types/types';

interface FormattedUnits {
  label: string;
  data: {
    x: string;
    y: number;
  }[];
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
  const [formattedUnits, setFormattedUnits] = useState<any[]>([]);

  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.units.value);

  const formatUnits = () => {
    console.log(units);
    const formatted: any[] = units.reduce((acc: any, curr) => {
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
          data: [{ x: curr.createdAt?.split('T')[0], y: curr.price }],
          climate: curr.climate,
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
          .data.push({
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
