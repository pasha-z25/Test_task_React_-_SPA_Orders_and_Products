'use client';

import { authRoutes } from '@/utils/constants';
import { usePathname } from 'next/navigation';

import Aside from '@/components/Aside';
import classNames from 'classnames';

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = !!authRoutes.find((route) => pathname.includes(route));

  return (
    <div className={classNames('wrapper grid', { 'grid-cols-[350px_auto]': !isAuthRoute })}>
      {!isAuthRoute && <Aside />}
      <main>{children}</main>
    </div>
  );
}
