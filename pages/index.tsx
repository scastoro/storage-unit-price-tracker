import type { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateUnits, selectUnits } from 'features/units/unitsSlice';

const Home: NextPage = () => {
  const units = useAppSelector((state) => state.units.value);
  console.log(units[0].name);
  return (
    <>
      <h1>Storage Unit Price Tracking</h1>
      <p>First unit name: {units[0].name}</p>
    </>
  );
};

export default Home;
