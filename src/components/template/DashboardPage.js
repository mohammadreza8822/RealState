"use client";

import { useTranslations, useLocale } from "next-intl";

function DashboardPage({ createdAt }) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'fa' || locale === 'ar';

  return (
    <div className="animate-fadeIn">
      <h3 className="text-blue-600 font-normal text-2xl mb-5">{t("dashboard.greeting")}</h3>
      <p className="text-gray-600">
        {t("dashboard.description")}
      </p>
      <div className="mt-24 flex bg-blue-50 w-fit px-3 py-1 rounded-md transition-all duration-300 hover:bg-blue-100">
        <p className="m-0 font-normal ml-3">{t("dashboard.membershipDate")}</p>
        <span className="text-blue-600">
          {new Date(createdAt).toLocaleDateString(isRTL ? (locale === 'fa' ? 'fa-IR' : 'ar-SA') : 'en-US')}
        </span>
      </div>
    </div>
  );
}

export default DashboardPage;
