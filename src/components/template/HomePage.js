"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCity } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import CategoryCard from "@/module/CategoryCard";
import heroBg from "@/public/images/home-bg.jpg";
import joinUs from "@/public/images/join-us.jpg";
import { cities, services } from "@/constants/strings";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  // استیت‌های سرچ
  const [query, setQuery] = useState("");
  const [transaction, setTransaction] = useState("خرید");
  const [propertyType, setPropertyType] = useState("همه املاک");

  // تابع جستجو
  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (transaction !== "خرید") params.set("transaction", transaction);
    if (propertyType !== "همه املاک") params.set("type", propertyType);

    const url = params.toString() ? `/search?${params.toString()}` : "/search";
    router.push(url);
  };

  return (
    <>
      {/* بک‌گراند سفید تمیز */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 to-blue-50" />

      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          {/* هیرو — با سرچ بار کاملاً کارآمد */}
          <section className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl mb-24 mt-10">
            <Image
              src={heroBg}
              alt="سامانه خرید و اجاره ملک"
              fill
              priority
              quality={95}
              className="object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="relative text-center py-24 md:py-32 px-8">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl">
                سامانه خرید و اجاره ملک
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 font-medium max-w-4xl mx-auto drop-shadow-lg mb-12">
                بهترین آگهی‌های مسکونی، تجاری و ویلایی با تضمین اصالت و مشاوره
                رایگان
              </p>

              {/* سرچ بار — حالا واقعاً کار می‌کنه! */}
              <div className="relative max-w-3xl mx-auto">
                <form
                  onSubmit={handleSearch}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row items-center p-3 gap-3">
                    {/* اینپوت اصلی */}
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="جستجو در آگهی‌ها، محله یا شهر..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-12 py-4 pr-4 text-base text-gray-800 placeholder-gray-500 bg-transparent outline-none"
                      />
                      <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>

                    {/* دکمه موبایل */}
                    <button
                      type="submit"
                      className="sm:hidden w-full bg-[#304ffe] text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
                    >
                      جستجو
                    </button>

                    {/* سلکت‌ها و دکمه دسکتاپ */}
                    <div className="hidden sm:flex items-center gap-4">
                      {/* نوع معامله */}
                      <div className="relative">
                        <select
                          value={transaction}
                          onChange={(e) => setTransaction(e.target.value)}
                          className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 px-5 py-4 pl-5 pr-12 rounded-xl font-medium outline-none cursor-pointer hover:border-[#304ffe] focus:border-[#304ffe] transition w-32"
                        >
                          <option>خرید</option>
                          <option>اجاره</option>
                          <option>رهن و اجاره</option>
                          <option>رهن کامل</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* نوع ملک */}
                      <div className="relative">
                        <select
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 px-5 py-4 pl-6 pr-12 rounded-xl font-medium outline-none cursor-pointer hover:border-[#304ffe] focus:border-[#304ffe] transition w-40"
                        >
                          <option>همه املاک</option>
                          <option>آپارتمان مسکونی</option>
                          <option>خانه ویلایی</option>
                          <option>مغازه و تجاری</option>
                          <option>دفتر اداری</option>
                          <option>زمین و کلنگی</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* دکمه جستجو */}
                      <button
                        type="submit"
                        className="bg-[#304ffe] text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        جستجو
                      </button>
                    </div>
                  </div>
                </form>

                {/* افکت نورانی */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#304ffe]/20 to-cyan-400/20 blur-3xl -z-10 rounded-3xl" />
              </div>
            </div>
          </section>

          {/* بقیه بخش‌ها بدون تغییر — فقط فاصله‌ها رو کمی بهینه کردم */}
          <section className="max-w-6xl mx-auto mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-lg hover:shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 border border-blue-100"
                >
                  <FiCheckCircle className="text-2xl text-[#304ffe] flex-shrink-0" />
                  <span className="font-medium text-gray-800 text-sm md:text-base">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="my-32">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
              جستجو بر اساس نوع ملک
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <CategoryCard title="خانه ویلایی" name="villa" />
              <CategoryCard title="آپارتمان" name="apartment" />
              <CategoryCard title="مغازه" name="store" />
              <CategoryCard title="دفتر" name="office" />
            </div>
          </section>

          <section className="my-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
              شهرهای پربازدید
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {cities.slice(0, 8).map((city, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md border border-white/50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#304ffe]/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="p-8 text-center relative z-10">
                    <FaCity className="text-4xl text-[#304ffe] mx-auto mb-3 group-hover:scale-110 transition" />
                    <p className="text-xl font-bold text-gray-800">{city}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* بخش استخدام مشاور */}
        <section className="my-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-gradient-to-r from-[#304ffe] to-blue-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973')] bg-cover bg-center" />
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 p-12 md:p-16 text-white">
                <div className="flex flex-col justify-center space-y-8">
                  <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                    ما در حال استخدام
                    <br />
                    <span className="text-cyan-300">مشاور املاک حرفه‌ای</span>
                    هستیم!
                  </h2>
                  <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
                    اگر عاشق املاک هستید، تجربه فروش دارید و دنبال درآمد بالا و
                    محیط پویا می‌گردید، همین حالا به تیم ما بپیوندید.
                  </p>

                  <div className="space-y-4">
                    {[
                      "درآمد بالا + پورسانت عالی",
                      "آموزش حرفه‌ای رایگان",
                      "محیط کاری پویا و دوستانه",
                      "امکان رشد سریع در شرکت",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <FiCheckCircle className="text-2xl text-cyan-300 flex-shrink-0" />
                        <span className="text-base md:text-lg">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <Link
                      href="/join-us"
                      className="inline-flex items-center gap-3 bg-white text-[#304ffe] px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      همین حالا درخواست بده
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full w-64 h-64 -z-10 animate-pulse" />
                    <Image
                      src={joinUs}
                      alt="پیوستن به تیم مشاوران"
                      width={300}
                      height={350}
                      className="rounded-2xl shadow-2xl object-cover border-4 border-white/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
