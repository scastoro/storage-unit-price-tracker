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
import { Unit } from 'types/types';
import { format } from 'path/win32';

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
            item.label === `${curr.dimensions.length}x${curr.dimensions.width}`
        )
      ) {
        acc.push({
          label: `${curr.dimensions.length}x${curr.dimensions.width}`,
          data: [{ x: curr.createdAt, y: curr.price }],
        });
      } else {
        acc
          .find(
            (item: any) =>
              item.label ===
              `${curr.dimensions.length}x${curr.dimensions.width}`
          )
          .data.push({
            x: curr.createdAt,
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
        'http://localhost:3000/api/units?facility=625ebf06cffcf740f283a6dc',
        {
          mode: 'cors',
        }
      );
      const units = await response.json();
      dispatch(updateUnits(units.data));
      formatUnits();
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
            datasets: [
              {
                label: formattedUnits[1].label,
                data: formattedUnits[1].data,
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default Facility;
