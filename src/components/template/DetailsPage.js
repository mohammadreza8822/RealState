// src/template/DetailsPage.jsx   (یا هر مسیری که داری)
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import { BiCalendarCheck } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SiHomebridge } from "react-icons/si";

import { sp } from "@/utils/replaceNumber";
import { icons } from "@/constants/icons";

import ItemList from "@/module/ItemList";
import Title from "@/module/Title";
import ShareButton from "@/module/ShareButton";
import FavoriteButton from "@/module/FavoriteButton";
import VisitRequestModal from "@/module/VisitRequestModal";
import AdminVisitScheduler from "@/module/AdminVisitScheduler";

export default function DetailsPage({
  data: {
    _id,
    title,
    description,
    location,
    amenities,
    rules,
    realState,
    phone,
    price,
    category,
    constructionDate,
    image,
    visitAvailability = [], // جدید — زمان‌های مجاز بازدید
  },
}) {
  const { data: session, status } = useSession();
  const t = useTranslations();
  const locale = useLocale();
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  const isUser = status === "authenticated" && session?.user?.role === "USER";
  const isAdmin = status === "authenticated" && session?.user?.role === "ADMIN";

  const categories = {
    apartment: t("detailsPage.categories.apartment"),
    villa: t("detailsPage.categories.villa"),
    store: t("detailsPage.categories.store"),
    office: t("detailsPage.categories.office"),
  };

  const dateLocale = locale === 'fa' ? 'fa-IR' : locale === 'ar' ? 'ar-SA' : 'en-US';
  const formattedDate = new Date(constructionDate).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const mainImage = Array.isArray(image) ? image[0] : image;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* بخش اصلی آگهی */}
            <div className="lg:col-span-2 space-y-10">
              {/* عکس اصلی */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="relative h-[400px] md:h-[500px] group">
                  {mainImage ? (
                    <Image
                      src={mainImage}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="w-24 h-24 bg-white/30 rounded-3xl flex items-center justify-center mb-4 shadow-xl">
                        {icons[category] || icons.apartment}
                      </div>
                      <span className="text-gray-500 font-medium text-lg">
                        {t("detailsPage.noImage")}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#304ffe] to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {categories[category]}
                  </div>
                  {Array.isArray(image) && image.length > 1 && (
                    <div className={`absolute top-4 ${locale === 'fa' || locale === 'ar' ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-bold text-[#304ffe] shadow-lg`}>
                      {image.length} {t("detailsPage.photos")}
                    </div>
                  )}
                </div>
              </div>

              {/* عنوان + علاقه‌مندی */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
                      {title}
                    </h1>
                    <div className="flex items-center gap-3 text-lg text-gray-600">
                      <HiOutlineLocationMarker className="text-2xl text-[#304ffe]" />
                      <span className="font-medium">{location}</span>
                    </div>
                  </div>
                  <FavoriteButton adId={_id} size="large" />
                </div>
              </div>

              {/* توضیحات */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <Title title={t("detailsPage.fullDescription")} />
                <p className="text-gray-700 leading-8 text-justify whitespace-pre-line">
                  {description}
                </p>
              </div>

              {/* امکانات */}
              {amenities?.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                  <Title title={t("detailsPage.amenities")} />
                  <ItemList data={amenities} />
                </div>
              )}

              {/* قوانین */}
              {rules?.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                  <Title title={t("detailsPage.rules")} />
                  <ItemList data={rules} />
                </div>
              )}
            </div>

            {/* سایدبار */}
            <div className="space-y-6">
              {/* کارت مشاور */}
              <div className="bg-white rounded-3xl shadow-2xl border border-[#304ffe]/10 overflow-hidden">
                <div className="bg-gradient-to-r from-[#304ffe] to-blue-600 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <SiHomebridge className="text-3xl" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">{t("detailsPage.realEstate")}</p>
                      <p className="text-xl font-bold">{realState}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-3 w-full bg-[#304ffe] text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {t("detailsPage.contactConsultant")}
                  </a>

                  <div className="text-center">
                    <p className="text-3xl font-black text-[#304ffe]">
                      {sp(price)} {locale === 'fa' ? 'تومان' : locale === 'ar' ? 'ريال' : 'Toman'}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className={`flex items-center gap-4 text-gray-700 ${locale === 'fa' || locale === 'ar' ? '' : 'flex-row-reverse'}`}>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-[#304ffe]">
                        {icons[category]}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t("detailsPage.category")}</p>
                        <p className="font-bold">{categories[category]}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-4 text-gray-700 ${locale === 'fa' || locale === 'ar' ? '' : 'flex-row-reverse'}`}>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                        <BiCalendarCheck className="text-2xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t("detailsPage.constructionDate")}</p>
                        <p className="font-bold">{formattedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* اشتراک‌گذاری */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <ShareButton />
              </div>

              {isAdmin ? (
                /* ادمین: تنظیم زمان‌های مجاز بازدید */
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-8 text-white">
                  <AdminVisitScheduler
                    listingId={_id}
                    currentAvailability={visitAvailability}
                  />
                </div>
              ) : isUser ? (
                /* کاربر عادی: درخواست بازدید */
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl shadow-2xl p-8 text-white text-center">
                  <h3 className="text-2xl font-bold mb-5 leading-relaxed">
                    {t("detailsPage.wantToSee")}
                  </h3>
                  <button
                    onClick={() => setIsVisitModalOpen(true)}
                    className="w-full bg-white text-emerald-600 px-8 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-4"
                  >
                    <BiCalendarCheck className="text-3xl" />
                    {t("detailsPage.requestVisitFree")}
                  </button>
                  <p className="text-sm mt-4 opacity-90">
                    {t("detailsPage.consultantWillCall")}
                  </p>
                </div>
              ) : (
                /* مهمان: دعوت به ورود */
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl shadow-2xl p-8 text-white text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    {t("detailsPage.loginToRequest")}
                  </h3>
                  <Link href="/signin">
                    <button className="w-full bg-white text-amber-600 px-8 py-5 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 transition">
                      {t("common.login")} / {t("common.signup")}
                    </button>
                  </Link>
                  <p className="text-sm mt-4 opacity-90">
                    {t("detailsPage.afterLogin")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* مودال درخواست بازدید — فقط برای کاربر عادی */}
      {isUser && (
        <VisitRequestModal
          isOpen={isVisitModalOpen}
          onClose={() => setIsVisitModalOpen(false)}
          listingId={_id}
          listingTitle={title}
          location={location}
          visitAvailability={visitAvailability}
        />
      )}
    </>
  );
}
