import React, { useEffect } from 'react';
import Link from 'next/link';
import { updateFacilities } from 'features/facilities/facilitiesSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import LoginButton from './auth/login-btn';

function Navbar() {
  const facilities = useAppSelector((state) => state.facilities.value);
  const dispatch = useAppDispatch();

  // TODO: Explore using getServerSideProps instead of client side data fetching.
  useEffect(() => {
    // Get facilities on Navbar component mount
    async function getFacilities() {
      let url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/facilities`;
      if (process.env.NODE_ENV === "development")
      {
        url = url.replace('https', 'http');
      }
      const response = await fetch(url, {
        mode: 'cors',
      });
      const facilities = await response.json();
      dispatch(updateFacilities(facilities.data));
      console.log(facilities);
    }
    getFacilities();
  }, [dispatch]);

  return (
    <nav className='m-auto my-5 w-4/5'>
      <ul className='flex gap-4'>
        <li className='underline hover:text-slate-500'>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        {/* Dynamically generate navigation based on facilities */}
        {facilities.map((facility) => (
          <li className='underline hover:text-slate-500' key={facility._id}>
            <Link href={`/facility/${facility._id}`}>
              <a>{facility.name}</a>
            </Link>
          </li>
        ))}
        <LoginButton />
      </ul>
    </nav>
  );
}

export default Navbar;
