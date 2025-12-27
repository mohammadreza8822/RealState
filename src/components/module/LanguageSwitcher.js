"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // RTL languages: Arabic and Persian
  const isRTL = locale === 'fa' || locale === 'ar';

  const languages = [
    // { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const switchLanguage = (newLocale) => {
    // Use the locale-aware router
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
        aria-label="Change language"
      >
        <span className="text-lg mt-1">{currentLanguage.flag}</span>
        <span className="font-medium text-gray-700 hidden sm:inline">
          {currentLanguage.name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 min-w-[160px]`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                  locale === lang.code ? 'bg-blue-50' : ''
                } ${isRTL ? '' : 'flex-row-reverse'}`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium text-gray-700">{lang.name}</span>
                {locale === lang.code && (
                  <span className={`${isRTL ? 'ml-auto' : 'mr-auto'} text-blue-600`}>✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

