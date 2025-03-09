'use client';

import { authRoutes } from '@/utils/constants';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

import Aside from '@/components/Aside';
import AnimatedLayout from '@/components/AnimatedLayout';

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = !!authRoutes.find((route) => pathname.includes(route));

  return (
    <div
      className={classNames('wrapper grid', {
        'grid-cols-[350px_auto]': !isAuthRoute,
      })}
    >
      {!isAuthRoute && <Aside />}
      <main className="bg-slate-100">
        <AnimatedLayout>{children}</AnimatedLayout>
      </main>
    </div>
  );
}
