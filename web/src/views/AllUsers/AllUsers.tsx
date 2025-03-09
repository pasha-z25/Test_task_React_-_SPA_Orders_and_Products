'use client';

import { Error, Loader } from '@/components/UIElements';
import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  getAllUsers,
  getUsers,
  getUsersStatus,
} from '@/store/slices/usersSlice';
import type { IViewProps, User } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { SlUserUnfollow } from 'react-icons/sl';
import { USER_CARD_DATE_FORMAT } from '@/utils/constants';
import { getFormattedDateAndTime } from '@/utils/helpers';
import { useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function AllUsers({ lang }: IViewProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(getUsersStatus);
  const users = useAppSelector(getAllUsers);

  const { t } = useTranslation(lang);

  useEffect(() => {
    if (!loading && !users?.length) {
      dispatch(getUsers());
    }
  }, [users?.length, dispatch, loading]);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  const renderUserCard = (user: User) => {
    const isActiveUser = user.active;

    return (
      <>
        <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-4 flex-1">
          <Image
            src={user.avatar}
            alt={user.name}
            width="150"
            height="150"
            className="row-span-2"
            loading="lazy"
            unoptimized={true}
          />
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-xl font-bold">{user.name}</h2>{' '}
              <span className="text-xs">Gender: {user.gender}</span>
            </div>
            <Typography className="text-xs">
              <span>Registered:</span>{' '}
              {getFormattedDateAndTime(
                lang,
                USER_CARD_DATE_FORMAT,
                user.registered
              )}
            </Typography>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <Typography>Email: {user.email}</Typography>
              {!!user.phone && (
                <Typography>
                  <span>Phone:</span> {user.phone}
                </Typography>
              )}
            </div>
            {!!user.address && (
              <Typography>
                <span>Address:</span> {user.address}
              </Typography>
            )}
          </div>
        </div>
        {!isActiveUser && (
          <Typography className="text-center">
            <SlUserUnfollow size={20} color="gray" className="mx-auto mb-2" />
            <span className="inline-block bg-slate-100 p-2">
              {t('common.disabled')}
            </span>
          </Typography>
        )}
      </>
    );
  };

  return (
    <section className="users-section py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center gap-4">
          <FaUsers size={30} color="green" />
          <h1 className="text-xl font-bold">{t('common.users')}</h1>
        </div>
        <div className="wrapper">
          <ul className="grid gap-4">
            {!!users?.length &&
              users.map((user: User) => (
                <li key={user.id}>
                  <Link href={`/${lang}/users/${user.id}`}>
                    <Card>
                      <CardContent className="flex items-center justify-between">
                        {renderUserCard(user)}
                      </CardContent>
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
