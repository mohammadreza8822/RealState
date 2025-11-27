"use client";

import Card from "@/module/Card";
import SideBar from "@/module/SideBar";
import { FiHome } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

// تبدیل کلید به فارسی برای نمایش
const categoryPersian = {
  villa: "ویلا",
  apartment: "آپارتمان",
  store: "مغازه",
  office: "دفتر",
};

function BuyResidentialPage({ data = [] }) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  const hasAds = data.length > 0;

  // عنوان هوشمند بر اساس فیلتر
  const pageTitle =
    currentCategory === "all" || !currentCategory
      ? "خرید ملک مسکونی"
      : `خرید ${categoryPersian[currentCategory] || "ملک"}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* عنوان هوشمند و زیبا */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#304ffe] to-blue-600 inline-block leading-tight">
            {pageTitle}
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-600 font-medium">
            {hasAds ? (
              <>
                نمایش
                <span className="text-2xl font-black text-[#304ffe] mx-2">
                  {data.length.toLocaleString("fa-IR")}
                </span>
                آگهی فعال
                {currentCategory !== "all" && currentCategory && (
                  <>
                    در دسته
                    <span className="font-bold text-[#304ffe] text-2xl">
                      {categoryPersian[currentCategory]}
                    </span>
                  </>
                )}
              </>
            ) : (
              <span className="text-gray-500">
                در حال حاضر هیچ آگهی ثبت نشده است
              </span>
            )}
          </p>
        </div>

        {/* محتوا: سایدبار + لیست آگهی‌ها */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* سایدبار — چسبنده و لوکس */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#304ffe]/10 p-7">
              <SideBar />
            </div>
          </aside>

          {/* لیست آگهی‌ها */}
          <main className="lg:col-span-3 order-1 lg:order-2">
            {hasAds ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-9">
                {data.map((profile) => (
                  <div
                    key={profile._id}
                    className="transform hover:-translate-y-3 transition-all duration-500"
                  >
                    <Card data={profile} />
                  </div>
                ))}
              </div>
            ) : (
              /* پیام وقتی آگهی نیست — فوق‌العاده حرفه‌ای */
              <div className="text-center py-32 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100">
                <div className="text-9xl mb-8 opacity-10 font-bold text-[#304ffe]">
                  آگهی
                </div>
                <h2 className="text-4xl font-extrabold text-gray-700 mb-6">
                  هنوز هیچ آگهی ثبت نشده است
                </h2>
                <p className="text-lg text-gray-500 max-w-md mx-auto px-6 leading-relaxed">
                  به زودی بهترین آگهی‌های خرید ملک در این دسته‌بندی اضافه خواهد
                  شد.
                </p>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="mt-10 inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#304ffe] to-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  بازگشت به بالا
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default BuyResidentialPage;
