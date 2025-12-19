"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { HiX } from "react-icons/hi";

export default function AdvancedFilter() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Check if we're on favorites page
  const isFavoritesPage = pathname?.includes('/favorites');

  const [isOpen, setIsOpen] = useState(false);

  // مقادیر فعلی از URL
  const currentCategory = searchParams.get("category") || "all";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentMinArea = searchParams.get("minArea") || "";
  const currentMaxArea = searchParams.get("maxArea") || "";

  // استیت محلی
  const [category, setCategory] = useState(currentCategory);
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
  const [minArea, setMinArea] = useState(currentMinArea);
  const [maxArea, setMaxArea] = useState(currentMaxArea);

  // هر تغییر = آپدیت فوری URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (category && category !== "all") params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minArea) params.set("minArea", minArea);
    if (maxArea) params.set("maxArea", maxArea);

    // اگر در صفحه favorites هستیم، به favorites redirect کن، وگرنه به buy-residential
    const basePath = isFavoritesPage ? '/favorites' : '/buy-residential';
    const newUrl = params.toString()
      ? `${basePath}?${params.toString()}`
      : basePath;

    if (window.location.pathname + window.location.search !== newUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [category, minPrice, maxPrice, minArea, maxArea, router, isFavoritesPage]);

  // همگام‌سازی با URL خارجی (مثل رفرش)
  useEffect(() => {
    setCategory(currentCategory);
    setMinPrice(currentMinPrice);
    setMaxPrice(currentMaxPrice);
    setMinArea(currentMinArea);
    setMaxArea(currentMaxArea);
  }, [searchParams]);

  // پاک کردن همه فیلترها
  const clearFilters = () => {
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    // اگر در صفحه favorites هستیم، به favorites redirect کن، وگرنه به buy-residential
    const basePath = isFavoritesPage ? '/favorites' : '/buy-residential';
    router.replace(basePath, { scroll: false });
    setIsOpen(false);
  };

  const hasActiveFilter =
    currentCategory !== "all" ||
    currentMinPrice ||
    currentMaxPrice ||
    currentMinArea ||
    currentMaxArea;

  return (
    <>
      {/* دکمه شناور موبایل */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#304ffe] to-blue-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold text-lg hover:scale-110 transition-all duration-300"
      >
        <HiX
          className={`text-2xl transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
        {t("filter.title")} {hasActiveFilter && `(${t("filter.active")})`}
      </button>

      {/* پنل فیلتر */}
      <div
        className={`${
          isOpen
            ? "fixed inset-0 z-40 bg-black/50 lg:relative lg:bg-transparent"
            : "hidden lg:block"
        }`}
      >
        <div
          className={`${
            isOpen
              ? "fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
              : "w-full"
          } lg:p-0`}
        >
          {/* هدر موبایل */}
          {isOpen && (
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <h3 className="text-2xl font-extrabold text-gray-800">{t("filter.title")}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500"
              >
                <HiX className="text-3xl" />
              </button>
            </div>
          )}

          <div className="bg-white lg:bg-transparent rounded-3xl lg:rounded-none shadow-2xl lg:shadow-none border lg:border-none p-6 lg:p-8">
            <div className="flex flex-wrap items-end gap-4">
              {/* دسته‌بندی */}
              {/* دسته‌بندی — فلش از چپ فاصله داره + کاملاً تمیز */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("filter.category")}
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-3 pl-12 pr-4 rounded-xl border border-gray-300 focus:border-[#304ffe] focus:ring-4 focus:ring-blue-100 transition appearance-none bg-white text-right"
                  >
                    <option value="all">{t("filter.allProperties")}</option>
                    <option value="apartment">{t("common.apartment")}</option>
                    <option value="villa">{t("common.villa")}</option>
                    <option value="store">{t("common.store")}</option>
                    <option value="office">{t("common.office")}</option>
                  </select>

                  {/* فلش پیش‌فرض مرورگر رو با فاصله می‌ذاریم سمت چپ */}
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* از قیمت */}
              <div className="flex-1 min-w-[170px]">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("filter.fromPrice")}
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder={t("filter.fromPricePlaceholder")}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-[#304ffe]"
                />
              </div>

              {/* تا قیمت */}
              <div className="flex-1 min-w-[170px]">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("filter.toPrice")}
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder={t("filter.toPricePlaceholder")}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-[#304ffe]"
                />
              </div>

              {/* متراژ از */}
              <div className="flex-1 min-w-[130px]">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("filter.fromArea")}
                </label>
                <input
                  type="number"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  placeholder={t("filter.fromAreaPlaceholder")}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-[#304ffe]"
                />
              </div>

              {/* متراژ تا */}
              <div className="flex-1 min-w-[130px]">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("filter.toArea")}
                </label>
                <input
                  type="number"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  placeholder={t("filter.toAreaPlaceholder")}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-[#304ffe]"
                />
              </div>

              {/* دکمه پاک کردن همه — دقیقاً توی خط! */}
              {hasActiveFilter && (
                <div className="ml-2">
                  <button
                    onClick={clearFilters}
                    className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                  >
                    {t("filter.clearAll")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
