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
    const colorScheme = [
      '#25CCF7',
      '#FD7272',
      '#54a0ff',
      '#00d2d3',
      '#1abc9c',
      '#2ecc71',
      '#3498db',
      '#9b59b6',
      '#34495e',
      '#16a085',
      '#27ae60',
      '#2980b9',
      '#8e44ad',
      '#2c3e50',
      '#f1c40f',
      '#e67e22',
      '#e74c3c',
      '#ecf0f1',
      '#95a5a6',
      '#f39c12',
      '#d35400',
      '#c0392b',
      '#bdc3c7',
      '#7f8c8d',
      '#55efc4',
      '#81ecec',
      '#74b9ff',
      '#a29bfe',
      '#dfe6e9',
      '#00b894',
      '#00cec9',
      '#0984e3',
      '#6c5ce7',
      '#ffeaa7',
      '#fab1a0',
      '#ff7675',
      '#fd79a8',
      '#fdcb6e',
      '#e17055',
      '#d63031',
      '#feca57',
      '#5f27cd',
      '#54a0ff',
      '#01a3a4',
    ];
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
          borderColor: colorScheme.splice(Math.floor(Math.random() * colorScheme.length - 1), 1),
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
