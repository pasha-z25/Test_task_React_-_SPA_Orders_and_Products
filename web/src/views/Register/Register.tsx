'use client';

import { useTranslation } from '@/i18n/client';
import type { IViewProps } from '@/utils/types';
import { Register as RegisterForm } from '@/components/Forms';
import { IoMdPersonAdd } from 'react-icons/io';
import Link from 'next/link';
import { useAppSelector } from '@/store';
import { Card, Loader } from '@/components/UIElements';
import { getAuthorizedUser, getAuthState } from '@/store/slices/authSlice';
import { fallbackLng } from '@/i18n/utils';

export default function Register({ lang = fallbackLng }: IViewProps) {
  const { t } = useTranslation(lang);
  const { loading } = useAppSelector(getAuthState);
  const authorizedUser = useAppSelector(getAuthorizedUser);

  return (
    <section className="login-section py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center gap-4">
          <IoMdPersonAdd size={30} color="green" />
          <h1>{t('common.register')}</h1>
        </div>
        <Card>
          {authorizedUser ? (
            <>
              <h4> {t('sections.registerSuccessMessage')}</h4>
              <h5>
                {t('sections.registerMoveToLogin')}{' '}
                <Link href={`/${lang}/login`} className="underline">
                  {t('button.login')}
                </Link>
              </h5>
            </>
          ) : (
            <>
              <h4>{t('sections.registerPageHeader')}</h4>
              <RegisterForm />
              <h5>
                {t('sections.registerPageFooter')}{' '}
                <Link href={`/${lang}/login`} className="underline">
                  {t('button.login')}
                </Link>
              </h5>
            </>
          )}
        </Card>
      </div>
      {!!loading && <Loader />}
    </section>
  );
}
