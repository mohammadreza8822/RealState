"use client";

import { useTranslations } from "next-intl";
import AdminCard from "@/module/AdminCard";

function AdminPage({ profiles }) {
  const t = useTranslations();

  return (
    <div className="animate-fadeIn">
      {profiles.length ? null : (
        <p className="text-center text-lg text-gray-500 my-10">
          {t("adminPage.empty")}
        </p>
      )}
      {profiles.map((i) => (
        <AdminCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  );
}

export default AdminPage;
