import React from 'react';
import Link from 'next/link';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='facility'>
            <a>Facility</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
