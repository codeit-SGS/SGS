'use client';

import { usePathname } from 'next/navigation';
import Gnb from './gnb/Gnb';



export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideGnb = pathname === '/login' || pathname === '/signin';

  return (
    <>
      {!hideGnb && <Gnb />}
      {children}
    </>
  );
}
