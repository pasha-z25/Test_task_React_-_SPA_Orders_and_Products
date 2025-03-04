'use client';

import { fallbackLng } from '@/i18n/utils';
import { useAppDispatch, useAppSelector } from '@/store';
import { getAuthState, login } from '@/store/slices/authSlice';
import { getLang } from '@/store/slices/langSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from '@/i18n/client';
import {
  LoginFormDefaultValues,
  LoginFormSchema,
  LoginFormType,
} from '../schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledTextField } from '../components';

export default function Login() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getLang) || fallbackLng;
  const { user, token } = useAppSelector(getAuthState);
  const router = useRouter();
  const { t } = useTranslation(lang);

  useEffect(() => {
    if (!!user && !!token) {
      router.push(`/${lang}`);
    }
  }, [user, token]);

  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: LoginFormDefaultValues,
  });

  const submitHandler = ({ email, password }: LoginFormType) => {
    dispatch(login({ email, password }));
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="grid gap-4 justify-center"
    >
      <ControlledTextField
        t={t}
        control={control}
        label={t('common.email')}
        name="email"
        type="email"
        required
        className="!min-w-[300px]"
      />
      <ControlledTextField
        t={t}
        control={control}
        label={t('common.password')}
        name="password"
        type="password"
        required
        className="!min-w-[300px]"
      />
      <Button type="submit" variant="outlined">
        {t('button.login')}
      </Button>
    </form>
  );
}
