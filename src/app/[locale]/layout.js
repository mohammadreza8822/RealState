import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { yekan } from '@/utils/fonts';
import NextAuthProvider from '@/provides/NextAuthProvider';
import Layout from '@/layout/Layout';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Exclude dynamic routes from static generation
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  
  return {
    title: messages.metadata?.title || 'Real Estate System',
    description: messages.metadata?.description || 'Real Estate Buy & Sell Website',
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <NextAuthProvider>
        <Layout>{children}</Layout>
      </NextAuthProvider>
    </NextIntlClientProvider>
  );
}

