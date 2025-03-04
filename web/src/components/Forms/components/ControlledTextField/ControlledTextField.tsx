'use client';

import { Controller, Control } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Lang } from '@/utils/types';
import { TFunction } from 'i18next';

interface ControlledTextFieldProps {
  control: Control<any>;
  t: TFunction<string, undefined>;
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function ControlledTextField({
  control,
  t,
  name,
  label,
  type = 'text',
  required = false,
  fullWidth = true,
  className = '',
  ...props
}: ControlledTextFieldProps) {
  return (
    <FormControl fullWidth={fullWidth} className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            variant="outlined"
            required={required}
            error={!!error}
            helperText={t(error?.message || '')}
            {...props}
          />
        )}
      />
    </FormControl>
  );
}
