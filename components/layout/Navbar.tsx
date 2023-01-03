import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { updateFacilities } from 'features/facilities/facilitiesSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import LoginButton from '../auth/login-btn';

function Navbar() {
  const facilities = useAppSelector((state) => state.facilities.value);
  const dispatch = useAppDispatch();

  const [darkMode, setDarkMode] = useState<boolean>();

  // TODO: Explore using getServerSideProps instead of client side data fetching.
  useEffect(() => {
    async function getFacilities() {
      const response = await fetch(`/api/facilities`, {
        mode: 'cors',
      });
      const facilities = await response.json();
      dispatch(updateFacilities(facilities.data));
      console.log(facilities);
    }
    getFacilities();
  }, [dispatch]);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className='m-auto my-5 w-4/5'>
      <ul className='flex gap-4'>
        <li className='underline hover:text-slate-500 my-auto'>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        {/* Dynamically generate navigation based on facilities */}
        {facilities?.map((facility) => (
          <li className='underline hover:text-slate-500 my-auto' key={facility._id}>
            <Link href={`/facility/${facility._id}`}>
              <a>{facility.name}</a>
            </Link>
          </li>
        ))}
        <LoginButton />
        { darkMode !== undefined && <div className="form-control">
          <label className="label cursor-pointer" >
            <span className="label-text mr-2">{!darkMode ? "Dark" : "Light"} mode</span> 
            <input type="checkbox" className="toggle" checked={darkMode} onChange={() => setDarkMode(state => !state)} />
          </label>
        </div>}
      </ul>
    </nav>
  );
}

export default Navbar;
