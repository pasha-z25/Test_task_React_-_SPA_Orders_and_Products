import { UserGender } from '@/utils/types';
import { z } from 'zod';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'zodErrors.fieldHasToBeFilled' })
    .email({ message: 'zodErrors.notValidEmail' }),
  password: z.string().min(6, { message: 'zodErrors.tooShortPassword' }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const LoginFormDefaultValues = {
  email: '',
  password: '',
};

export const RegisterFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'zodErrors.fieldHasToBeFilled' })
      .email({ message: 'zodErrors.notValidEmail' }),
    phone: z
      .string()
      .refine((phone) => isMobilePhone(phone), {
        message: 'zodErrors.notValidPhone',
      })
      .optional(),
    password: z.string().min(6, { message: 'zodErrors.tooShortPassword' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'zodErrors.tooShortPassword' }),
    fullName: z.string().min(2, { message: 'zodErrors.tooShortName' }),
    gender: z.enum([UserGender.MALE, UserGender.FEMALE]),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'zodErrors.passwordsDontMatch',
    path: ['confirmPassword'],
  });

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;

export const RegisterFormDefaultValues = {
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  fullName: '',
  gender: UserGender.MALE,
  address: '',
};
