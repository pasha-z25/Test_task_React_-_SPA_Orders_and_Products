'use client';

import { fallbackLng } from '@/i18n/utils';
import { useAppSelector } from '@/store';
import { getAuthorizedUser } from '@/store/slices/authSlice';
import { getLang } from '@/store/slices/langSlice';
import Image from 'next/image';
import Link from 'next/link';
import { BsFillGearFill } from 'react-icons/bs';

export default function User() {
  const lang = useAppSelector(getLang) || fallbackLng;
  const user = useAppSelector(getAuthorizedUser);

  if (!user) return null;

  return (
    <div className="user-card relative rounded-full border shadow-lg">
      <Image
        src={user?.avatar}
        alt={user.name}
        width="150"
        height="150"
        className="rounded-full"
        unoptimized={true}
      />
      <Link
        href={`/${lang}/users/${user.id}`}
        className="absolute -bottom-2 -right-2 inline-block h-12 w-12 rounded-full border bg-white p-2 shadow-lg"
      >
        <BsFillGearFill size={30} />
      </Link>
    </div>
  );
}
