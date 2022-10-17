import { useSession } from 'next-auth/react';
import React from 'react';
import { ChildrenProps } from 'types/types';
import AccessDenied from '../auth/access-denied';
import Navbar from './Navbar';

function Layout({ children }: ChildrenProps) {
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