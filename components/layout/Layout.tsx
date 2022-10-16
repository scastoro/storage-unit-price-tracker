import { useSession } from 'next-auth/react';
import React from 'react';
import AccessDenied from '../auth/access-denied';
import Navbar from './Navbar';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: Props) {
  const {data: session, status } = useSession();

  if (!session) {
    return (
      <AccessDenied />
    )
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;