import { routing } from '@/i18n/routing';
import './globals.css';

export const metadata = {
  title: 'Real Estate System',
  description: 'Real Estate Buy & Sell Website',
};

// Root layout - only provides html/body tags
// Actual layout with Header/Footer is in [locale]/layout.js
export default function RootLayout({ children }) {
  const locale = routing.defaultLocale;
  const isRTL = locale === 'fa' || locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body>{children}</body>
    </html>
  );
}
