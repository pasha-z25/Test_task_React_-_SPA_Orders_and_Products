'use client';

import { fallbackLng } from '@/i18n/utils';
import { useAppSelector } from '@/store';
import { getLang } from '@/store/slices/langSlice';
import { HEADER_DATE_FORMAT } from '@/utils/constants';
import {
  capitalizeFirstLetter,
  getFormattedDateAndTime,
} from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { RiShieldUserFill } from 'react-icons/ri';

export default function Header() {
  const lang = useAppSelector(getLang) || fallbackLng;
  const [currentTime, setCurrentTime] = useState<string>(
    getFormattedDateAndTime(lang, HEADER_DATE_FORMAT)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getFormattedDateAndTime(lang, HEADER_DATE_FORMAT));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [lang]);

  return (
    <header className="py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <RiShieldUserFill size={70} color="green" />
            <span className="text-xl font-bold uppercase text-green-700">
              Inventory
            </span>
          </div>
          <div className="font-medium">
            <p>
              {capitalizeFirstLetter(getFormattedDateAndTime(lang, 'dddd'))}
            </p>
            <p>{currentTime}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
