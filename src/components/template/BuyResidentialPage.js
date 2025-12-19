"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Card from "@/module/Card";
import AdvancedFilter from "@/module/AdvancedFilter";

export default function BuyResidentialPage({ data: initialData = [] }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Check if we're on favorites page
  const isFavoritesPage = pathname?.includes('/favorites');

  // خواندن مقادیر فیلتر از URL
  const currentCategory = searchParams.get("category") || "all";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const minArea = searchParams.get("minArea") || "";
  const maxArea = searchParams.get("maxArea") || "";

  // حالت‌های فیلتر (محلی)
  const [category, setCategory] = useState(currentCategory);
  const [priceFrom, setPriceFrom] = useState(minPrice);
  const [priceTo, setPriceTo] = useState(maxPrice);
  const [areaFrom, setAreaFrom] = useState(minArea);
  const [areaTo, setAreaTo] = useState(maxArea);

  // وقتی URL تغییر کرد، فیلترها آپدیت بشن
  useEffect(() => {
    setCategory(currentCategory);
    setPriceFrom(minPrice);
    setPriceTo(maxPrice);
    setAreaFrom(minArea);
    setAreaTo(maxArea);
  }, [searchParams]);

  // اعمال فیلترها
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (category && category !== "all") params.set("category", category);
    if (priceFrom) params.set("minPrice", priceFrom);
    if (priceTo) params.set("maxPrice", priceTo);
    if (areaFrom) params.set("minArea", areaFrom);
    if (areaTo) params.set("maxArea", areaTo);

    // برو به URL جدید (بدون رفرش کامل)
    // اگر در صفحه favorites هستیم، به favorites redirect کن، وگرنه به buy-residential
    const targetPath = isFavoritesPage ? '/favorites' : '/buy-residential';
    router.push(`${targetPath}?${params.toString()}`);
  };

  // فیلتر کردن داده‌ها در کلاینت (موقت — بعداً از سرور می‌گیریم)
  const filteredData = initialData.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (priceFrom && item.price < Number(priceFrom)) return false;
    if (priceTo && item.price > Number(priceTo)) return false;
    // اگر بعداً متراژ اضافه کردی، این خط رو فعال کن
    // if (areaFrom && item.area < Number(areaFrom)) return false;
    // if (areaTo && item.area > Number(areaTo)) return false;
    return true;
  });

  const hasAds = filteredData.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <AdvancedFilter />
        {/* لیست آگهی‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hasAds ? (
            filteredData.map((profile) => (
              <div
                key={profile._id}
                className="hover:-translate-y-2 transition-all duration-500"
              >
                <Card data={profile} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24">
              <div className="text-9xl opacity-10 mb-6">{t("buyResidentialPage.ad")}</div>
              <h2 className="text-3xl font-extrabold text-gray-600">
                {t("buyResidentialPage.noAdsFound")}
              </h2>
              <p className="text-gray-500 mt-4">
                {t("buyResidentialPage.changeFilters")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
