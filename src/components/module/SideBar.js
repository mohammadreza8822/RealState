"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { HiFilter } from "react-icons/hi";

function SideBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // دسته‌بندی‌ها با اسم فارسی و مقدار انگلیسی
  const categories = [
    { key: "all", value: "همه" },
    { key: "villa", value: "ویلا" },
    { key: "apartment", value: "آپارتمان" },
    { key: "office", value: "دفتر" },
    { key: "store", value: "مغازه" },
  ];

  // دسته‌بندی فعلی (از URL)
  const currentCategory = searchParams.get("category") || "all";

  // تابع تغییر دسته‌بندی
  const handleCategoryChange = (categoryKey) => {
    const params = new URLSearchParams(searchParams);

    if (categoryKey === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryKey);
    }

    // حفظ سایر پارامترها (مثل q یا page در آینده)
    router.push(`/buy-residential?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* عنوان */}
      <div className="flex items-center gap-3 pb-4 border-b-2 border-[#304ffe]/10">
        <HiFilter className="text-3xl text-[#304ffe]" />
        <h3 className="text-2xl font-extrabold text-gray-800">دسته‌بندی</h3>
      </div>

      {/* لیست دسته‌بندی‌ها */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleCategoryChange(cat.key)}
            className={`
              w-full text-right py-3 px-5 rounded-xl font-medium text-lg transition-all duration-300
              flex items-center justify-between group
              ${
                currentCategory === cat.key
                  ? "bg-gradient-to-r from-[#304ffe] to-blue-600 text-white shadow-lg shadow-[#304ffe]/30"
                  : "bg-gray-50 text-gray-700 hover:bg-[#304ffe]/10 hover:text-[#304ffe] hover:shadow-md"
              }
            `}
          >
            <span>{cat.value}</span>

            {/* چک‌مارک وقتی انتخاب شده */}
            {currentCategory === cat.key && (
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* تعداد آگهی‌ها (اختیاری — بعداً از props بگیری) */}
      {/* <div className="text-center pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          نمایش <span className="font-bold text-[#304ffe]">12</span> آگهی
        </p>
      </div> */}
    </div>
  );
}

export default SideBar;
