"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiX } from "react-icons/hi";

export default function AdvancedFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

    const newUrl = params.toString()
      ? `/buy-residential?${params.toString()}`
      : "/buy-residential";

    if (window.location.pathname + window.location.search !== newUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [category, minPrice, maxPrice, minArea, maxArea, router]);

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
    router.replace("/buy-residential", { scroll: false });
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
        فیلترها {hasActiveFilter && "(فعال)"}
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
              <h3 className="text-2xl font-extrabold text-gray-800">فیلترها</h3>
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
                  دسته‌بندی
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-3 pl-12 pr-4 rounded-xl border border-gray-300 focus:border-[#304ffe] focus:ring-4 focus:ring-blue-100 transition appearance-none bg-white text-right"
                  >
                    <option value="all">همه املاک</option>
                    <option value="apartment">آپارتمان</option>
                    <option value="villa">ویلا</option>
                    <option value="store">مغازه</option>
                    <option value="office">دفتر</option>
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
                  از قیمت
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="۵۰۰ میلیون"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-[#304ffe]"
                />
              </div>

              {/* تا قیمت */}
              <div className="flex-1 min-w-[170px]">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  تا قیمت
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="۱۰ میلیارد"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-[#304ffe]"
                />
              </div>

              {/* متراژ از */}
              <div className="flex-1 min-w-[130px]">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  متراژ از
                </label>
                <input
                  type="number"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  placeholder="80"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-[#304ffe]"
                />
              </div>

              {/* متراژ تا */}
              <div className="flex-1 min-w-[130px]">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  متراژ تا
                </label>
                <input
                  type="number"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  placeholder="300"
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
                    پاک کردن همه
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
