import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateUnits } from 'features/units/unitsSlice';
import UnitTable from 'components/Tables/UnitTable';
import { COLUMNS } from 'components/Tables/unitColumns';

const Home: NextPage = () => {
  const units = useAppSelector((state) => state.units.value);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUnits() {
      setLoading(true);
      const response = await fetch(
        'http://localhost:3000/api/units?limit=5&sort=-createdAt&populate=facility._id:name',
        {
          mode: 'cors',
        }
      );
      const units = await response.json();
      dispatch(updateUnits(units.data));
      setLoading(false);
    }
    getUnits();
  }, [dispatch]);

  console.log(units);

  return (
    <>
      <h1>Storage Unit Price Tracking</h1>
      <p style={{ height: '100px' }}>
        Unit sizes:{' '}
        {units.map(
          (item) => `${item.dimensions.width}x${item.dimensions.width} 
          `
        )}{' '}
      </p>
      {!loading && <UnitTable units={units} tableColumns={COLUMNS} />}
    </>
  );
};

export default Home;
