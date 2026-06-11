"use client";

import { useTranslations, useLocale } from "next-intl";
import { isRTLLocale } from "@/utils/locale";

function ItemList({ data }) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = isRTLLocale(locale);

  return (
    <div className="animate-fadeIn">
      {data.length ? (
        <ul
          className={`list-disc mb-12 marker:text-primary ${isRTL ? "pr-5" : "pl-5"}`}
        >
          {data.map((rule, index) => (
            <li key={index} className="text-gray-700 mb-2 leading-7">
              {rule}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center my-8">{t("itemList.empty")}</p>
      )}
    </div>
  );
}

export default ItemList;
