'use client';

import { fallbackLng } from '@/i18n/utils';
import { useAppSelector } from '@/store';
import { getLang } from '@/store/slices/langSlice';
import { HEADER_DATE_FORMAT, HEADER_SITE_NAME } from '@/utils/constants';
import {
  capitalizeFirstLetter,
  getFormattedDateAndTime,
} from '@/utils/helpers';
import { useSocket } from '@/utils/hooks/useSocket';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { WebSocketEvents } from '@/utils/types';

import { RiShieldUserFill } from 'react-icons/ri';

import Typography from '@mui/material/Typography';

export default function Header() {
  const lang = useAppSelector(getLang) || fallbackLng;
  const [currentTime, setCurrentTime] = useState<string>(
    getFormattedDateAndTime(lang, HEADER_DATE_FORMAT)
  );
  const [sessionCount, setSessionCount] = useState<number>(0);
  const { t } = useTranslation(lang);
  const { socket } = useSocket();

  useEffect(() => {
    socket?.on(WebSocketEvents.SESSION_COUNT, (data) => {
      setSessionCount(data);
    });

    return () => {
      socket?.off(WebSocketEvents.SESSION_COUNT);
    };
  }, [socket]);

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
            <Typography
              component="span"
              className="!text-xl !font-bold uppercase text-green-700"
            >
              {HEADER_SITE_NAME}
            </Typography>
          </div>
          <div className="font-medium">
            <Typography>
              {capitalizeFirstLetter(getFormattedDateAndTime(lang, 'dddd'))}
            </Typography>
            <Typography>{currentTime}</Typography>
            <Typography>
              {t('common.activeSessions')}: {sessionCount}
            </Typography>
          </div>
        </div>
      </div>
    </header>
  );
}
