"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";
import { isRTLLocale } from "@/utils/locale";

export default function SetHtmlDir() {
  const locale = useLocale();

  useEffect(() => {
    const rtl = isRTLLocale(locale);
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
