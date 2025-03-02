'use client';

import { Error, Loader } from '@/components/UIElements';
import { useTranslation } from '@/i18n/client';
import { fallbackLng } from '@/i18n/utils';
import { useAppDispatch, useAppSelector } from '@/store';
import { getAuthorizedUser, logout } from '@/store/slices/authSlice';
import { getLang } from '@/store/slices/langSlice';
import { getSelectedUser, getUser, getUsersStatus } from '@/store/slices/usersSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSave, FaUser, FaUserEdit } from 'react-icons/fa';

export default function OneUser({ userId }: { userId: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const lang = useAppSelector(getLang) || fallbackLng;
  const authorizedUser = useAppSelector(getAuthorizedUser);
  const selectedUser = useAppSelector(getSelectedUser);
  const { loading, error } = useAppSelector(getUsersStatus);

  const isCurrentUser = authorizedUser?.id === selectedUser?.id;

  const [editMode, setEditMode] = useState<boolean>(false);

  const { t } = useTranslation(lang);

  useEffect(() => {
    dispatch(getUser(userId));
  }, []);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  if (!selectedUser) return null;

  return (
    <section className="users-section py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center gap-4">
          <FaUser size={30} color="green" />
          <h1 className="text-xl font-bold">{selectedUser?.name}</h1>
        </div>
        {isCurrentUser && (
          <div className="editing-block flex items-center justify-between gap-4">
            {editMode ? (
              <button type="button" onClick={() => setEditMode(false)}>
                <FaSave size={20} color="green" />
              </button>
            ) : (
              <button type="button" onClick={() => setEditMode(true)}>
                <FaUserEdit size={20} color="green" />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                dispatch(logout());
                router.push(`/${lang}/login`);
              }}
            >
              {t('button.logout')}
            </button>
          </div>
        )}
        <div className="user-info">
          <Image
            src={selectedUser.avatar}
            alt={selectedUser.name}
            width="250"
            height="250"
            unoptimized={true}
          />
          <p>
            <Link href={`mailto:${selectedUser.email}`}>{selectedUser.email}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
