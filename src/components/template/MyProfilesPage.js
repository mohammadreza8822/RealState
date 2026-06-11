"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FiPlus, FiInbox } from "react-icons/fi";
import DashboardCard from "@/module/DashboardCard";

function MyProfilesPage({ profiles }) {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("myProfiles.title")}</h1>
          <p className="text-gray-500 text-sm mt-1">{t("myProfiles.subtitle")}</p>
        </div>
        <Link
          href="/dashboard/add"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#304ffe] text-white font-medium rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all hover:scale-[1.02]"
        >
          <FiPlus />
          {t("myProfiles.addNew")}
        </Link>
      </div>

      {profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#304ffe] mb-4">
            <FiInbox className="text-3xl" />
          </div>
          <p className="text-gray-500 text-lg">{t("myProfiles.empty")}</p>
          <Link
            href="/dashboard/add"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#304ffe] text-white font-medium rounded-xl hover:bg-blue-700 transition"
          >
            <FiPlus />
            {t("myProfiles.addNew")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {profiles.map((item) => (
            <DashboardCard key={item._id} data={JSON.parse(JSON.stringify(item))} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProfilesPage;
