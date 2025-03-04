'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { useTranslation } from '@/i18n/client';
import { getLang } from '@/store/slices/langSlice';
import { fallbackLng } from '@/i18n/utils';
import Button from '@mui/material/Button';
import { UserGender } from '@/utils/types';
import { useForm } from 'react-hook-form';
import {
  RegisterFormDefaultValues,
  RegisterFormSchema,
  RegisterFormType,
} from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledTextField, ControlledSelect } from '../components';
import { addNewUser } from '@/store/slices/authSlice';

export default function Register() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getLang) || fallbackLng;
  const { t } = useTranslation(lang);

  const { control, handleSubmit } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: RegisterFormDefaultValues,
  });

  const submitHandler = ({
    email,
    password,
    fullName,
    gender,
    phone,
    address,
  }: RegisterFormType) => {
    dispatch(
      addNewUser(
        JSON.stringify({
          email,
          password,
          name: fullName,
          gender,
          phone,
          address,
        })
      )
    );
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="grid gap-4 justify-center grid-cols-2 max-w-[616px] mx-auto"
    >
      <ControlledTextField
        t={t}
        control={control}
        label={t('common.email')}
        name="email"
        type="email"
        required
      />
      <ControlledTextField
        t={t}
        control={control}
        label={t('common.phone')}
        name="phone"
        type="tel"
      />
      <ControlledTextField
        t={t}
        control={control}
        label={t('common.password')}
        name="password"
        type="password"
        required
      />
      <ControlledTextField
        t={t}
        control={control}
        label={t('common.confirmPassword')}
        name="confirmPassword"
        type="password"
        required
      />
      <ControlledTextField
        t={t}
        control={control}
        label={t('common.fullName')}
        name="fullName"
        required
      />
      <ControlledSelect
        control={control}
        name="gender"
        label={t('common.gender')}
        required={true}
        options={[
          { value: UserGender.MALE, label: t('common.genderMale') },
          { value: UserGender.FEMALE, label: t('common.genderFemale') },
        ]}
      />
      <ControlledTextField
        t={t}
        control={control}
        label={t('common.address')}
        name="address"
        className="col-span-2"
      />
      <Button type="submit" variant="outlined" className="col-span-2">
        {t('button.register')}
      </Button>
    </form>
  );
}
