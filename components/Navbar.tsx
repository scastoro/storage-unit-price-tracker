import React from 'react';
import Link from 'next/link';
import { useAppSelector } from 'app/hooks';

// Make dynamic navbar with links to facilities based on id
// Look into next router
function Navbar() {
  const facilities = useAppSelector((state) => state.facilities.value);

  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        {facilities.map((facility) => (
          <li key={facility._id}>
            <Link href={`/facility/${facility._id}`}>
              <a>{facility.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
