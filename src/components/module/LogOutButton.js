"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { useTranslations, useLocale } from "next-intl";
import { isRTLLocale } from "@/utils/locale";

function LogOutButton() {
  const t = useTranslations("common");
  const locale = useLocale();
  const isRTL = isRTLLocale(locale);

  return (
    <button
      onClick={signOut}
      className={`flex items-center w-full text-base text-red-600 mt-5 hover:text-red-700 transition-colors duration-200 ${isRTL ? "text-right" : "text-left"}`}
    >
      <FiLogOut className={isRTL ? "ml-2" : "mr-2"} />
      {t("logout")}
    </button>
  );
}

export default LogOutButton;
