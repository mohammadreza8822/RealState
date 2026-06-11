"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { useTranslations, useLocale } from "next-intl";
import { isRTLLocale } from "@/utils/locale";

function CustomDatePicker({ profileData, setProfileData }) {
  const t = useTranslations("customDatePicker");
  const locale = useLocale();
  const isRTL = isRTLLocale(locale);

  const changeHandler = (e) => {
    const date = new Date(e);
    setProfileData({ ...profileData, constructionDate: date });
  };

  return (
    <div className="mb-16 animate-fadeIn">
      <p className="mb-2 text-base">{t("constructionDate")}</p>
      <DatePicker
        calendar={isRTL ? persian : gregorian}
        locale={isRTL ? persian_fa : gregorian_en}
        value={profileData.constructionDate}
        onChange={changeHandler}
        calendarPosition={isRTL ? "bottom-right" : "bottom-left"}
        inputClass="w-[140px] border border-dashed border-primary text-gray-600 rounded-md px-3 py-2 text-base h-[38px] text-center focus:border-solid focus:outline-none transition-all duration-200"
      />
    </div>
  );
}

export default CustomDatePicker;
