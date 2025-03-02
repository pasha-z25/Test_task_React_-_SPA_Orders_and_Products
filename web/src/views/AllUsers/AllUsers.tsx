'use client';

import { Card, Error, Loader } from '@/components/UIElements';
import { useTranslation } from '@/i18n/client';
import { fallbackLng } from '@/i18n/utils';
import { useAppDispatch, useAppSelector } from '@/store';
import { getLang } from '@/store/slices/langSlice';
import { getAllUsers, getUsers, getUsersStatus } from '@/store/slices/usersSlice';
import { User } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { SlUserUnfollow } from 'react-icons/sl';

import { useEffect } from 'react';

export default function AllUsers() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getLang) || fallbackLng;
  const { loading, error } = useAppSelector(getUsersStatus);
  const users = useAppSelector(getAllUsers);

  const { t } = useTranslation(lang);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  return (
    <section className="users-section py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center gap-4">
          <FaUsers size={30} color="green" />
          <h1 className="text-xl font-bold">{t('menu.users')}</h1>
        </div>
        <div className="wrapper">
          <ul className="grid gap-4">
            {!!users?.length &&
              users.map((user: User) => (
                <li key={user.id}>
                  <Link href={`/${lang}/users/${user.id}`}>
                    <Card className="flex items-center justify-between" disabled={!user.active}>
                      <div className="flex items-center gap-4">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width="250"
                          height="250"
                          unoptimized={true}
                        />
                        <p>{user.name}</p>
                      </div>
                      {!user.active && (
                        <p className="bg-red-300 p-2">
                          <SlUserUnfollow size={20} color="gray" />
                          {t('common.disabled')}
                        </p>
                      )}
                    </Card>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
