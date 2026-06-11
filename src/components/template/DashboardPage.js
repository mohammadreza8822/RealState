"use client";

import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { isRTLLocale } from "@/utils/locale";
import { FiHome, FiPlusCircle, FiSearch } from "react-icons/fi";

function DashboardPage({ createdAt }) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = isRTLLocale(locale);

  const dateLocale = isRTL ? (locale === "fa" ? "fa-IR" : "ar-SA") : "en-US";
  const memberDate = new Date(createdAt).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const quickActions = [
    {
      href: "/dashboard/my-profiles",
      icon: FiHome,
      title: t("dashboard.manageListings"),
      desc: t("dashboard.manageListingsDesc"),
      color: "from-blue-500 to-[#304ffe]",
    },
    {
      href: "/dashboard/add",
      icon: FiPlusCircle,
      title: t("dashboard.addListing"),
      desc: t("dashboard.addListingDesc"),
      color: "from-emerald-500 to-teal-600",
    },
    {
      href: "/buy-residential",
      icon: FiSearch,
      title: t("dashboard.viewSite"),
      desc: t("dashboard.viewSiteDesc"),
      color: "from-violet-500 to-purple-600",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#304ffe] via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("dashboard.greeting")}</h1>
          <p className="text-blue-100 text-sm md:text-base max-w-lg">
            {t("dashboard.description")}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-sm">
            <span className="text-blue-100">{t("dashboard.memberSince")}</span>
            <span className="font-semibold">{memberDate}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          {t("dashboard.quickActions")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg hover:border-[#304ffe]/30 transition-all duration-300"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
              >
                <action.icon className="text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
