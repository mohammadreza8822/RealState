"use client";

import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useLocale, useTranslations } from "next-intl";
import { isRTLLocale } from "@/utils/locale";

export default function PersianDate({ date, withTime = false }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const isRTL = isRTLLocale(locale);

  if (!date) return <span>{t("unknown")}</span>;

  if (isRTL && locale === "fa") {
    const d = new DateObject(date)
      .set("calendar", persian)
      .set("locale", persian_fa);

    if (withTime) {
      return <span>{d.format("dddd D MMMM YYYY - HH:mm")}</span>;
    }
    return <span>{d.format("D MMMM YYYY")}</span>;
  }

  const d = new Date(date);
  const dateLocale = locale === "ar" ? "ar-SA" : "en-US";

  if (withTime) {
    return (
      <span>
        {d.toLocaleString(dateLocale, {
          dateStyle: "full",
          timeStyle: "short",
        })}
      </span>
    );
  }

  return (
    <span>
      {d.toLocaleDateString(dateLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  );
}
