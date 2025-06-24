'use client';

import { usePathname } from 'next/navigation';
import Gnb from '@/components/gnb/Gnb';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideGnb = pathname === '/login' || pathname === '/signin';

  return (
    <>
      {!hideGnb && <Gnb />}
      {children}
    </>
  );
}
