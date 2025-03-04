'use client';

import { Error, Loader } from '@/components/UIElements';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/store';
import { getAuthorizedUser, logout } from '@/store/slices/authSlice';
import {
  getSelectedUser,
  getUser,
  getUsersStatus,
} from '@/store/slices/usersSlice';
import { USER_CARD_DATE_FORMAT } from '@/utils/constants';
import { getFormattedDateAndTime } from '@/utils/helpers';
import type { IViewProps, User } from '@/utils/types';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSave, FaUser, FaUserEdit } from 'react-icons/fa';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OneUser({ lang, id: userId }: IViewProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authorizedUser = useAppSelector(getAuthorizedUser);
  const selectedUser = useAppSelector(getSelectedUser);
  const { loading, error } = useAppSelector(getUsersStatus);

  const isCurrentUser = authorizedUser?.id === selectedUser?.id;

  const [editMode, setEditMode] = useState<boolean>(false);

  const { t } = useTranslation(lang);

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, []);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  if (!selectedUser) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderUserCard = (user: User, editMode?: boolean) => {
    const isActiveUser = user.active;

    return (
      <div className="grid grid-cols-[auto_1fr]">
        <div>
          <Image
            src={user.avatar}
            alt={user.name}
            width="250"
            height="250"
            unoptimized={true}
            className={classNames({ grayscale: !isActiveUser })}
          />
          <p className="text-xs my-2">Gender: {user.gender}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">
            {user.name}{' '}
            {!isActiveUser && (
              <span className="inline-block bg-slate-100 p-2 text-xs">
                {t('common.disabled')}
              </span>
            )}
          </h2>
          <h3 className="text-lg">Contacts:</h3>
          <p>
            <span>Email:</span>{' '}
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </p>
          <p>
            <span>Phone:</span>{' '}
            {!!user.phone ? (
              <Link href={`tel:${user.phone}`}>{user.phone}</Link>
            ) : (
              'empty'
            )}
          </p>
          <p>
            <span>Address:</span> {!!user.address ? user.address : 'empty'}
          </p>
        </div>
        <div>
          <p className="text-xs">
            <span>Registered:</span>{' '}
            {getFormattedDateAndTime(
              lang,
              USER_CARD_DATE_FORMAT,
              user.registered
            )}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="users-section py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center gap-4">
          <FaUser size={30} color="green" />
          <Typography variant="h4" component="h1">
            {selectedUser?.name}
          </Typography>
        </div>
        {isCurrentUser && (
          <div className="editing-block flex items-center justify-between gap-4 mb-4">
            {editMode ? (
              <button
                type="button"
                onClick={() => setEditMode(false)}
                title={'Save'}
              >
                <FaSave size={20} color="green" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                title={'Edit'}
              >
                <FaUserEdit size={20} color="green" />
              </button>
            )}
            <Button
              variant="contained"
              type="button"
              onClick={() => {
                dispatch(logout());
                router.push(`/${lang}/login`);
              }}
              title={t('button.logout')}
            >
              {t('button.logout')}
            </Button>
          </div>
        )}
        <div className="user-info">
          <Card>
            <CardContent>{renderUserCard(selectedUser, editMode)}</CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
