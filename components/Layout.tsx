import React from 'react';
import Navbar from './Navbar';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
