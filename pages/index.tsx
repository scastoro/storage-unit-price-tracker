import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateUnits, selectUnits } from 'features/units/unitsSlice';

const Home: NextPage = () => {
  const units = useAppSelector((state) => state.units.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getUnits() {
      const response = await fetch('http://localhost:3000/api/units?limit=5', {
        mode: 'cors',
      });
      const units = await response.json();
      dispatch(updateUnits(units.data));
      console.log(units);
    }
    getUnits();
  }, []);

  return (
    <>
      <h1>Storage Unit Price Tracking</h1>
      <p style={{ height: '100px' }}>
        First unit name:{' '}
        {units.map(
          (item) => `${item.dimensions.width}x${item.dimensions.width} 
          `
        )}{' '}
      </p>
    </>
  );
};

export default Home;
