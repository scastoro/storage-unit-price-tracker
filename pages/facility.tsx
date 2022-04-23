import { useAppSelector } from 'app/hooks';
import { NextPage } from 'next';

const Facility: NextPage = () => {
  const units = useAppSelector((state) => state.units.value);
  console.log(units);
  return (
    <>
      <h1>Facility Test </h1>
      {units.map((item) => item.price + ' ')}
    </>
  );
};

export default Facility;
