import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateUnits } from 'features/units/unitsSlice';
import UnitTable from 'components/Tables/UnitTable';
import { COLUMNS } from 'components/Tables/unitColumns';
import FacilityInfo from 'components/FacilityInfo';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const units = useAppSelector((state) => state.units.value);
  const facilities = useAppSelector((state) => state.facilities.value);

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function getUnits() {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000';
      const response = await fetch(
        `https://${url}/api/units?limit=5&sort=-createdAt&populate=facility._id:name`,
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

  return (
    <section className='m-auto w-4/5'>
      <h1 className='underline'>Storage Unit Price Tracking</h1>
      <p style={{ height: '100px' }}>
        Unit sizes:{' '}
        {units.map(
          (item) => `${item.dimensions.width}x${item.dimensions.width} 
          `
        )}{' '}
      </p>
      {!loading && <UnitTable units={units} tableColumns={COLUMNS} />}
      {facilities.length > 0 && <FacilityInfo facility={facilities[0]} />}
    </section>
  );
};

export default Home;
