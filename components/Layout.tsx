import React from 'react';
import Navbar from './Navbar';

function Layout({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
