import StoreProvider from '@/store/StoreProvider';
import type { Lang } from '@/utils/types';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Main from '@/components/Main';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export interface ILayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lng: Lang;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<ILayoutProps>) {
  const { lng } = await params;
  return (
    <html lang={lng}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <div className="body-wrapper">
            <Header />
            <Main>{children}</Main>
            <Footer lang={lng} />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
