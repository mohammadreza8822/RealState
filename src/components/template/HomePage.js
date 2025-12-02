"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { FaFire, FaChartLine, FaCalculator, FaStar } from "react-icons/fa";
import { FiCheckCircle, FiTrendingUp, FiMapPin, FiClock } from "react-icons/fi";
import heroBg from "@/public/images/home-bg.jpg";
import joinUs from "@/public/images/join-us.jpg";
import { services } from "@/constants/strings";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  // استیت‌های سرچ
  const [query, setQuery] = useState("");
  const [transaction, setTransaction] = useState("خرید");
  const [propertyType, setPropertyType] = useState("همه املاک");
  const [residential, setResidential] = useState([]);

  // شمارنده زنده (انیمیشن)
  const [stats, setStats] = useState({ listings: 0, today: 0, sold: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        listings: 18420,
        today: 487,
        sold: 1234,
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/profile", {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { data } = await res.json();
        setResidential(data);
      } catch (error) {
        console.error("خطا در دریافت فایل‌های داغ امروز:", error);
      }
    }

    fetchData();
  }, []); // ❗ مهم — فقط یک بار اجرا شود

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
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50" />
      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          {/* ==================== هیرو خفن با همه فیچرهای جدید ==================== */}
          <section className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl mb-20 mt-8">
            <Image
              src={heroBg}
              alt="سامانه خرید و اجاره ملک"
              fill
              priority
              quality={100}
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="relative text-center py-24 md:py-36 px-8">
              {/* شمارنده زنده بالای عنوان */}
              <div className="flex justify-center gap-8 md:gap-16 mb-8 text-white/90">
                <div className="text-center">
                  <p className="text-3xl md:text-5xl font-black">
                    {stats.listings.toLocaleString("fa-IR")}+
                  </p>
                  <p className="text-sm md:text-lg mt-1">آگهی فعال</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-5xl font-black text-orange-400">
                    +{stats.today}
                  </p>
                  <p className="text-sm md:text-lg mt-1 flex items-center gap-2 justify-center">
                    <FiClock /> امروز
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-5xl font-black text-green-400">
                    {stats.sold.toLocaleString("fa-IR")}
                  </p>
                  <p className="text-sm md:text-lg mt-1">معامله موفق</p>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl">
                ملک رویاهات اینجاست!
              </h1>
              <p className="text-xl md:text-3xl text-cyan-200 font-bold max-w-5xl mx-auto drop-shadow-2xl mb-10">
                بدون واسطه · قیمت واقعی · مشاوره رایگان ۲۴ ساعته
              </p>

              {/* سرچ‌بار ارتقا یافته */}
              <form
                onSubmit={handleSearch}
                className="relative max-w-4xl mx-auto"
              >
                <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                  <div className="flex flex-col lg:flex-row items-stretch p-4 gap-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="محله، خیابان، اسم پروژه یا شهر..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-14 py-5 text-lg text-gray-800 bg-transparent outline-none"
                      />
                      <FiMapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-blue-600" />
                    </div>

                    <select
                      value={transaction}
                      onChange={(e) => setTransaction(e.target.value)}
                      className="px-6 py-5 rounded-2xl bg-gray-50 font-bold text-gray-700"
                    >
                      <option>خرید</option>
                      <option>اجاره</option>
                      <option>رهن و اجاره</option>
                      <option>رهن کامل</option>
                    </select>

                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="px-6 py-5 rounded-2xl bg-gray-50 font-bold text-gray-700"
                    >
                      <option>همه املاک</option>
                      <option>آپارتمان</option>
                      <option>ویلا</option>
                      <option>مغازه</option>
                      <option>دفتر</option>
                    </select>

                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-3"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      جستجو کن
                    </button>
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-cyan-500/30 to-blue-600/30 blur-3xl -z-10 animate-pulse" />
              </form>

              {/* تگ‌های سریع زیر سرچ‌بار */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {[
                  "نوساز",
                  "با پارکینگ",
                  "جنوب شهر",
                  "ویو آزاد",
                  "تخفیف ویژه",
                  "اجاره روزانه",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-white/30 cursor-pointer transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
          {/* ==================== فایل‌های داغ امروز ==================== */}
          <section className="my-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-4xl md:text-5xl font-black flex items-center gap-4">
                <FaFire className="text-orange-500 text-5xl" />
                فایل‌های داغ امروز
              </h2>
              <Link
                href="/buy-residential"
                className="text-blue-600 font-bold hover:underline"
              >
                مشاهده همه ➤
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* اینجا ۸ تا کارت فایل جدید و جذاب بذار (من فقط اسکلت می‌دم) */}
              {residential.map((item) => (
                <Link href={`/buy-residential/${item._id}`} key={item._id}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all group">
                    <div className="relative">
                      <div className="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-48" />
                      <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                        جدید
                      </span>
                      <span className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <FiTrendingUp /> +۱۸٪
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="font-bold text-lg">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.location}</p>
                      <p className="text-2xl font-black text-blue-600 mt-3">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          {/* ==================== محاسبه‌گر سریع وام ==================== */}
          <section className="my-32">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-10 md:p-16 text-white shadow-2xl">
              <h3 className="text-3xl md:text-5xl font-black text-center mb-10 flex items-center justify-center gap-4">
                <FaCalculator className="text-5xl" />
                چقدر وام می‌تونی بگیری؟
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-xl">متراژ ملک</p>
                  <input
                    type="number"
                    defaultValue={100}
                    className="mt-3 w-full px-6 py-4 rounded-2xl text-gray-800 text-2xl font-bold text-center"
                  />
                </div>
                <div>
                  <p className="text-xl">قیمت هر متر</p>
                  <input
                    type="number"
                    defaultValue={120}
                    className="mt-3 w-full px-6 py-4 rounded-2xl text-gray-800 text-2xl font-bold text-center"
                    placeholder="میلیون"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-5xl font-black">۹۶۰ میلیون</p>
                  <p className="text-xl mt-2">وام مسکن قابل دریافت</p>
                  <button className="mt-6 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-xl shadow-lg hover:scale-105 transition mt-6">
                    محاسبه دقیق ➤
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* ==================== بقیه بخش‌های قبلی (خدمات، دسته‌بندی، شهرها) ==================== */}
          {/* اینا رو هم قشنگ‌تر کردم ولی کدشون رو کوتاه کردم که طولانی نشه */}
          <section className="max-w-6xl mx-auto my-32">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
              چرا ما؟
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl hover:scale-105 transition"
                >
                  <FiCheckCircle className="text-5xl text-blue-600 mx-auto mb-4" />
                  <p className="font-bold text-xl">{s}</p>
                </div>
              ))}
            </div>
          </section>
          {/* ==================== بخش جذب مشاور — نسخه فوق حرفه‌ای ۱۴۰۴ ==================== */}
          <section className="my-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl overflow-hidden shadow-3xl">
                {/* بک‌گراند متحرک نرم */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center" />
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 md:p-16 text-white">
                  {/* سمت چپ — متن و مزایا */}
                  <div className="flex flex-col justify-center space-y-10">
                    <div>
                      <span className="inline-block bg-cyan-400/30 backdrop-blur-sm text-cyan-100 px-4 py-2 rounded-full text-sm font-bold mb-4">
                        فرصت شغلی ویژه
                      </span>
                      <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
                        به تیم مشاوران برتر
                        <br />
                        <span className="text-cyan-300">ما بپیوندید!</span>
                      </h2>
                    </div>

                    <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-lg">
                      اگر عاشق املاک هستید، فروشنده حرفه‌ای هستید و دنبال درآمد
                      بدون سقف می‌گردید، جای درست آمدید. ما بهترین فایل‌ها،
                      بالاترین پورسانت و پشتیبانی کامل رو بهتون می‌دیم.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                      {[
                        {
                          icon: FaChartLine,
                          text: "درآمد ماهانه تا ۳۰۰ میلیون",
                          color: "text-green-300",
                        },
                        {
                          icon: FiTrendingUp,
                          text: "پورسانت تا ۰.۷٪",
                          color: "text-yellow-300",
                        },
                        {
                          icon: FaStar,
                          text: "آموزش رایگان + منتورینگ",
                          color: "text-pink-300",
                        },
                        {
                          icon: FiCheckCircle,
                          text: "فایل انحصاری روزانه",
                          color: "text-cyan-300",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-5"
                        >
                          <item.icon className={`text-3xl ${item.color}`} />
                          <span className="font-bold text-lg">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 mt-8">
                      <Link
                        href="/signup"
                        className="group bg-white text-indigo-600 px-10 py-6 rounded-2xl font-black text-xl text-center shadow-2xl hover:scale-110 hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        همین حالا درخواست بده
                        <svg
                          className="w-7 h-7 group-hover:translate-x-3 transition"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>

                      <a
                        href="https://wa.me/989123456789"
                        target="_blank"
                        className="bg-green-500 hover:bg-green-600 text-white px-10 py-6 rounded-2xl font-black text-xl text-center shadow-xl hover:scale-105 transition flex items-center justify-center gap-3"
                      >
                        واتساپ بزن
                      </a>
                    </div>
                  </div>

                  {/* سمت راست — عکس + آمار زنده */}
                  <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-cyan-400/30 blur-3xl animate-pulse rounded-full" />
                      <Image
                        src={joinUs}
                        alt="تیم مشاوران حرفه‌ای"
                        width={420}
                        height={500}
                        className="rounded-3xl shadow-2xl border-8 border-white/20 object-cover"
                      />
                      <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl font-black text-lg shadow-xl">
                        ۴۲ مشاور فعال
                      </div>
                    </div>

                    {/* آمار سریع */}
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6">
                        <p className="text-4xl font-black text-yellow-300">
                          ۱,۲۳۴
                        </p>
                        <p className="text-lg mt-2">معامله موفق</p>
                      </div>
                      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6">
                        <p className="text-4xl font-black text-green-300">
                          ۸۷٪
                        </p>
                        <p className="text-lg mt-2">رضایت مشاوران</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
