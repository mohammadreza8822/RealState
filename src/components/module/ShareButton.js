"use client";

import { LuShare2 } from "react-icons/lu";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { isRTLLocale } from "@/utils/locale";

function ShareButton() {
  const t = useTranslations("share");
  const locale = useLocale();
  const isRTL = isRTLLocale(locale);
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <CopyToClipboard text={`${url}`}>
      <div className="flex items-center justify-center cursor-pointer group">
        <LuShare2
          className={`${isRTL ? "ml-2" : "mr-2"} text-xl text-primary transition-colors duration-200`}
        />
        <button className="border-none bg-transparent text-base text-gray-500 group-hover:text-primary transition-colors duration-200">
          {t("label")}
        </button>
      </div>
    </CopyToClipboard>
  );
}

export default ShareButton;
