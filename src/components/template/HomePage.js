"use client";

import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { FaFire, FaChartLine, FaCalculator, FaStar, FaHome, FaBuilding, FaStore, FaBriefcase } from "react-icons/fa";
import { FiCheckCircle, FiTrendingUp, FiMapPin, FiClock, FiHeart, FiUsers, FiAward } from "react-icons/fi";
import { MdApartment, MdVilla, MdStore, MdBusiness } from "react-icons/md";
import heroBg from "@/public/images/home-bg.jpg";
import joinUs from "@/public/images/join-us.jpg";
import { Link } from "@/i18n/routing";
import Card from "@/module/Card";

export default function HomePage() {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'fa' || locale === 'ar';

  // استیت‌های سرچ
  const [query, setQuery] = useState("");
  const buyText = t("common.buy");
  const allPropertiesText = t("common.allProperties");
  const [transaction, setTransaction] = useState(buyText);
  const [propertyType, setPropertyType] = useState(allPropertiesText);
  const [residential, setResidential] = useState([]);

  // شمارنده زنده (انیمیشن)
  const [stats, setStats] = useState({ listings: 0, today: 0, sold: 0 });
  const [animatedStats, setAnimatedStats] = useState({ listings: 0, today: 0, sold: 0 });

  // انیمیشن شمارنده
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
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    const animateValue = (start, end, setter) => {
      const increment = (end - start) / steps;
      let current = start;
      let step = 0;
      
      const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, stepDuration);
    };

    if (stats.listings > 0) {
      animateValue(0, stats.listings, (val) => setAnimatedStats(prev => ({ ...prev, listings: val })));
      animateValue(0, stats.today, (val) => setAnimatedStats(prev => ({ ...prev, today: val })));
      animateValue(0, stats.sold, (val) => setAnimatedStats(prev => ({ ...prev, sold: val })));
    }
  }, [stats]);

  // محاسبه‌گر وام
  const [loanArea, setLoanArea] = useState(100);
  const [loanPricePerMeter, setLoanPricePerMeter] = useState(120);
  const [loanAmount, setLoanAmount] = useState(960);

  useEffect(() => {
    // محاسبه 80% از ارزش ملک
    const totalValue = loanArea * loanPricePerMeter;
    const calculatedLoan = Math.floor(totalValue * 0.8);
    setLoanAmount(calculatedLoan);
  }, [loanArea, loanPricePerMeter]);

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
        console.error("Error fetching hot listings:", error);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (transaction !== buyText) params.set("transaction", transaction);
    if (propertyType !== allPropertiesText) params.set("type", propertyType);
    const url = params.toString() ? `/search?${params.toString()}` : "/search";
    router.push(url);
  };

  const services = [
    t("services.buy"),
    t("services.sell"),
    t("services.mortgage"),
    t("services.rent")
  ];

  const categories = [
    { name: "apartment", icon: MdApartment, label: t("common.apartment") },
    { name: "villa", icon: MdVilla, label: t("common.villa") },
    { name: "store", icon: MdStore, label: t("common.store") },
    { name: "office", icon: MdBusiness, label: t("common.office") },
  ];

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50" />
      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          {/* ==================== هیرو خفن با همه فیچرهای جدید ==================== */}
          <section className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl mb-20 mt-8">
            <Image
              src={heroBg}
              alt={t("home.heroImageAlt")}
              fill
              priority
              quality={100}
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="relative text-center py-24 md:py-36 px-8">
              {/* شمارنده زنده بالای عنوان با انیمیشن */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-8 text-white/90">
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
                    <p className="text-3xl md:text-5xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                      {animatedStats.listings.toLocaleString(isRTL ? (locale === 'fa' ? 'fa-IR' : 'ar-SA') : 'en-US')}+
                  </p>
                    <p className="text-sm md:text-lg mt-2 flex items-center justify-center gap-2">
                      <FiHeart className="text-red-400" /> {t("home.activeListings")}
                    </p>
                  </div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
                    <p className="text-3xl md:text-5xl font-black text-orange-400 animate-pulse">
                      +{animatedStats.today}
                  </p>
                    <p className="text-sm md:text-lg mt-2 flex items-center gap-2 justify-center">
                      <FiClock className="text-orange-300" /> {t("home.todayAdded")}
                  </p>
                  </div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
                  <p className="text-3xl md:text-5xl font-black text-green-400">
                      {animatedStats.sold.toLocaleString(isRTL ? (locale === 'fa' ? 'fa-IR' : 'ar-SA') : 'en-US')}
                    </p>
                    <p className="text-sm md:text-lg mt-2 flex items-center justify-center gap-2">
                      <FiAward className="text-green-300" /> {t("home.successfulDeals")}
                  </p>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl animate-fade-in-up">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                {t("home.title")}
                </span>
              </h1>
              <p className="text-xl md:text-3xl text-cyan-200 font-bold max-w-5xl mx-auto drop-shadow-2xl mb-10 animate-fade-in-up delay-200">
                {t("home.subtitle")}
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
                        placeholder={t("common.searchPlaceholder")}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={`w-full ${isRTL ? 'px-14' : 'px-5 pr-14'} py-5 text-lg text-gray-800 bg-transparent outline-none`}
                      />
                      <FiMapPin className={`absolute ${isRTL ? 'left-5' : 'right-5'} top-1/2 -translate-y-1/2 text-2xl text-blue-600`} />
                    </div>

                    <select
                      value={transaction}
                      onChange={(e) => setTransaction(e.target.value)}
                      className="px-6 py-5 rounded-2xl bg-gray-50 font-bold text-gray-700"
                    >
                      <option>{t("common.buy")}</option>
                      <option>{t("common.rent")}</option>
                      <option>{t("common.mortgageAndRent")}</option>
                      <option>{t("common.fullMortgage")}</option>
                    </select>

                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="px-6 py-5 rounded-2xl bg-gray-50 font-bold text-gray-700"
                    >
                      <option>{t("common.allProperties")}</option>
                      <option>{t("common.apartment")}</option>
                      <option>{t("common.villa")}</option>
                      <option>{t("common.store")}</option>
                      <option>{t("common.office")}</option>
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
                      {t("common.search")}
                    </button>
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-cyan-500/30 to-blue-600/30 blur-3xl -z-10 animate-pulse" />
              </form>

              {/* تگ‌های سریع زیر سرچ‌بار */}
              <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in-up delay-300">
                {[
                  t("home.quickTags.newBuild"),
                  t("home.quickTags.withParking"),
                  t("home.quickTags.southCity"),
                  t("home.quickTags.freeView"),
                  t("home.quickTags.specialDiscount"),
                  t("home.quickTags.dailyRent"),
                ].map((tag, index) => (
                  <span
                    key={tag}
                    className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-white/30 hover:scale-110 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
          {/* ==================== دسته‌بندی‌ها ==================== */}
          <section className="my-20">
            <h2 className="text-2xl md:text-3xl font-black text-center mb-12">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {t("common.allProperties")}
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {categories.map((category, index) => (
                <Link
                  href={`/buy-residential?category=${category.name}`}
                  key={category.name}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-blue-400">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                      <category.icon className="text-4xl text-white" />
                    </div>
                    <p className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                      {category.label}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ==================== فایل‌های داغ امروز ==================== */}
          <section className="my-20">
            <div className={`flex items-center justify-between mb-10 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
              <h2 className="text-2xl md:text-3xl font-black flex items-center gap-4">
                <FaFire className="text-orange-500 text-3xl md:text-4xl animate-pulse" />
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {t("home.hotListingsToday")}
                </span>
              </h2>
              <Link
                href="/buy-residential"
                className="group text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-2"
              >
                {t("common.viewAll")}
                <span className={`transition-transform ${isRTL ? 'group-hover:translate-x-2' : 'group-hover:-translate-x-2'}`}>
                  {isRTL ? '➤' : '←'}
                </span>
              </Link>
            </div>

            {residential.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {residential.slice(0, 8).map((item, index) => (
                  <div
                    key={item._id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card data={item} />
                  </div>
              ))}
            </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                <p className="mt-4 text-gray-600 text-lg">{t("common.loading")}</p>
              </div>
            )}
          </section>
          {/* ==================== محاسبه‌گر سریع وام ==================== */}
          <section className="my-32">
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
              {/* افکت پس‌زمینه */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat'
                }}></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black text-center mb-10 flex items-center justify-center gap-4">
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3">
                    <FaCalculator className="text-3xl md:text-4xl" />
                  </div>
                {t("home.loanCalculator.title")}
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <p className="text-base md:text-lg mb-4">{t("home.loanCalculator.propertyArea")}</p>
                  <input
                    type="number"
                      value={loanArea}
                      onChange={(e) => setLoanArea(Number(e.target.value))}
                      className="w-full px-6 py-4 rounded-2xl text-gray-800 text-lg md:text-xl font-bold text-center focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
                      min="1"
                  />
                    <p className="text-sm mt-2 text-white/80">{t("home.loanCalculator.squareMeter")}</p>
                </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <p className="text-base md:text-lg mb-4">{t("home.loanCalculator.pricePerMeter")}</p>
                  <input
                    type="number"
                      value={loanPricePerMeter}
                      onChange={(e) => setLoanPricePerMeter(Number(e.target.value))}
                      className="w-full px-6 py-4 rounded-2xl text-gray-800 text-lg md:text-xl font-bold text-center focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
                      min="1"
                    placeholder={t("home.loanCalculator.million")}
                  />
                    <p className="text-sm mt-2 text-white/80">{t("home.loanCalculator.million")} {t("home.loanCalculator.currency")}</p>
                  </div>
                  <div className="flex flex-col justify-center bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mb-4 transform hover:scale-105 transition-transform">
                      <p className="text-2xl md:text-3xl font-black text-white">
                        {loanAmount.toLocaleString(isRTL ? (locale === 'fa' ? 'fa-IR' : 'ar-SA') : 'en-US')}
                      </p>
                      <p className="text-base mt-2 text-white/90">{t("home.loanCalculator.million")}</p>
                    </div>
                    <p className="text-base md:text-lg mb-4">{t("home.loanCalculator.loanAmount")}</p>
                    <div className="text-sm text-white/80 bg-white/10 rounded-xl p-3">
                      <p>{t("home.loanCalculator.maxLoan")}</p>
                    </div>
                </div>
                </div>
              </div>
            </div>
          </section>
          {/* ==================== چرا ما؟ ==================== */}
          <section className="max-w-6xl mx-auto my-32">
            <h2 className="text-2xl md:text-3xl font-black text-center mb-16">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("home.whyUs.title")}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-blue-400 overflow-hidden"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* افکت پس‌زمینه */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-4 mb-4 inline-block group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <FiCheckCircle className="text-4xl text-white" />
                    </div>
                    <p className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
                      {s}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* ==================== بخش جذب مشاور — نسخه فوق حرفه‌ای و خفن ==================== */}
          <section className="my-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="relative group">
                {/* افکت نورانی دور کارت */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                
                <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 via-purple-700 to-pink-600 rounded-3xl overflow-hidden shadow-3xl border-2 border-white/20">
                  {/* بک‌گراند متحرک با افکت شیشه‌ای */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-700/80 to-pink-600/80"></div>
                    {/* افکت دایره‌ای متحرک */}
                    <div className="absolute top-0 -left-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 -right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                  <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 text-white">
                  {/* سمت چپ — متن و مزایا */}
                    <div className="flex flex-col justify-center space-y-8 z-10">
                      <div className="space-y-6">
                        {/* Badge با انیمیشن */}
                        <div className="inline-block">
                          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400/40 to-blue-400/40 backdrop-blur-xl text-cyan-100 px-6 py-3 rounded-full text-sm font-black mb-4 border border-cyan-300/30 shadow-lg hover:scale-105 transition-transform">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        {t("home.joinUs.badge")}
                      </span>
                        </div>
                        
                        {/* عنوان با گرادیانت متحرک */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                        {isRTL ? (
                          <>
                              <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent animate-gradient">
                            {t("home.joinUs.title")}
                              </span>
                            <br />
                              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                                {t("home.joinUs.titleHighlight")}
                              </span>
                          </>
                        ) : (
                          <>
                              <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                                {t("home.joinUs.title")}
                              </span>{" "}
                              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                                {t("home.joinUs.titleHighlight")}
                              </span>
                          </>
                        )}
                      </h2>
                    </div>

                      <p className="text-base md:text-lg text-gray-100 leading-relaxed max-w-lg font-medium">
                      {t("home.joinUs.description")}
                    </p>

                      {/* کارت‌های مزایا با انیمیشن */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                      {[
                        {
                          icon: FaChartLine,
                          text: t("home.joinUs.benefits.monthlyIncome"),
                            color: "from-green-400 to-emerald-500",
                            bgColor: "bg-green-500/20",
                            borderColor: "border-green-400/30",
                        },
                        {
                          icon: FiTrendingUp,
                          text: t("home.joinUs.benefits.commission"),
                            color: "from-yellow-400 to-orange-500",
                            bgColor: "bg-yellow-500/20",
                            borderColor: "border-yellow-400/30",
                        },
                        {
                          icon: FaStar,
                          text: t("home.joinUs.benefits.training"),
                            color: "from-pink-400 to-rose-500",
                            bgColor: "bg-pink-500/20",
                            borderColor: "border-pink-400/30",
                        },
                        {
                          icon: FiCheckCircle,
                          text: t("home.joinUs.benefits.exclusiveFiles"),
                            color: "from-cyan-400 to-blue-500",
                            bgColor: "bg-cyan-500/20",
                            borderColor: "border-cyan-400/30",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                            className={`group/benefit relative flex items-center gap-4 ${item.bgColor} backdrop-blur-xl rounded-2xl p-5 border-2 ${item.borderColor} hover:border-opacity-60 hover:scale-105 hover:shadow-2xl transition-all duration-300 ${isRTL ? '' : 'flex-row-reverse'}`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            {/* افکت درخشان */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover/benefit:opacity-20 rounded-2xl transition-opacity duration-300`}></div>
                            
                            <div className={`relative z-10 bg-gradient-to-br ${item.color} rounded-xl p-3 group-hover/benefit:scale-110 group-hover/benefit:rotate-6 transition-all duration-300 shadow-lg`}>
                              <item.icon className="text-2xl text-white" />
                            </div>
                            <span className="relative z-10 font-bold text-base md:text-lg group-hover/benefit:text-white transition-colors">
                              {item.text}
                            </span>
                        </div>
                      ))}
                    </div>

                      {/* دکمه‌های CTA با افکت‌های خفن */}
                      <div className={`flex flex-col sm:flex-row gap-4 mt-6 ${isRTL ? '' : 'flex-row-reverse'}`}>
                      <Link
                        href="/signup"
                          className="group relative bg-white px-10 py-6 rounded-2xl font-black text-lg md:text-xl text-center shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                      >
                          {/* افکت پس‌زمینه متحرک */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                          
                          <span className="relative z-10 text-indigo-600 group-hover:text-white transition-colors duration-300">
                        {t("home.joinUs.applyNow")}
                          </span>
                        <svg
                            className={`relative z-10 w-6 h-6 md:w-7 md:h-7 text-indigo-600 group-hover:text-white transition-all duration-300 ${isRTL ? 'group-hover:translate-x-3' : 'group-hover:-translate-x-3'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d={isRTL ? "M17 8l4 4m0 0l-4 4m4-4H3" : "M7 16l-4-4m0 0l4-4m-4 4h18"}
                          />
                        </svg>
                      </Link>

                      <a
                        href="https://wa.me/989123456789"
                        target="_blank"
                          rel="noopener noreferrer"
                          className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-6 rounded-2xl font-black text-lg md:text-xl text-center shadow-xl hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                      >
                          {/* افکت درخشش */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                          <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                        {t("home.joinUs.whatsapp")}
                          </span>
                      </a>
                    </div>
                  </div>

                  {/* سمت راست — عکس + آمار زنده */}
                    <div className="flex flex-col items-center justify-center space-y-8 z-10">
                      <div className="relative group/image">
                        {/* افکت نورانی دور عکس */}
                        <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/40 via-blue-400/40 to-purple-400/40 rounded-3xl blur-2xl group-hover/image:blur-3xl transition-all duration-500 animate-pulse"></div>
                        
                    <div className="relative">
                      <Image
                        src={joinUs}
                        alt={t("home.joinUs.title")}
                        width={420}
                        height={500}
                            className="rounded-3xl shadow-2xl border-4 border-white/30 object-cover group-hover/image:scale-105 transition-transform duration-500"
                      />
                          
                          {/* Badge تعداد مشاوران */}
                          <div className={`absolute -bottom-4 ${isRTL ? '-left-4' : '-right-4'} bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-4 rounded-2xl font-black text-lg shadow-2xl border-4 border-white/40 transform hover:scale-110 transition-transform`}>
                            <div className="flex items-center gap-2">
                              <FiUsers className="text-2xl" />
                              <span>42 {t("home.joinUs.activeAgents")}</span>
                            </div>
                          </div>
                      </div>
                    </div>

                      {/* آمار سریع با انیمیشن */}
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="group/stat relative bg-white/20 backdrop-blur-xl rounded-2xl p-6 border-2 border-yellow-400/30 hover:border-yellow-400/60 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/30">
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 opacity-0 group-hover/stat:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                          <div className="relative z-10">
                            <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                          1,234
                        </p>
                            <p className="text-sm md:text-base mt-2 font-semibold">{t("home.joinUs.successfulDeals")}</p>
                          </div>
                      </div>
                        <div className="group/stat relative bg-white/20 backdrop-blur-xl rounded-2xl p-6 border-2 border-green-400/30 hover:border-green-400/60 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/30">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 opacity-0 group-hover/stat:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                          <div className="relative z-10">
                            <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                          87%
                        </p>
                            <p className="text-sm md:text-base mt-2 font-semibold">{t("home.joinUs.agentSatisfaction")}</p>
                          </div>
                        </div>
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
