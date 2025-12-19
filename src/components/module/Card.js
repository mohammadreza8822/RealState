"use client";

import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { BiLeftArrowAlt } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { sp } from "@/utils/replaceNumber";
import { icons } from "@/constants/icons";
import FavoriteButton from "../module/FavoriteButton.js";

function Card({ data }) {
  const t = useTranslations();
  const locale = useLocale();
  const { _id, category, title, location, price, image } = data;
  // اگر آرایه بود (مثل images) → اولین عکس رو نشون بده، اگر تک عکس بود → مستقیم

  const mainImage = Array.isArray(image) ? image[0] : image;
  
  const categoryLabels = {
    villa: t("detailsPage.categories.villa"),
    apartment: t("detailsPage.categories.apartment"),
    store: t("detailsPage.categories.store"),
    office: t("detailsPage.categories.office"),
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#304ffe]/30">
      {/* افکت نورانی هنگام هاور */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#304ffe]/20 via-blue-400/10 to-cyan-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-3xl" />

      {/* قلب ذخیره — بالا چپ */}
      <div className="absolute top-4 left-4 z-20">
        <FavoriteButton adId={_id} size="medium" />
      </div>

      {/* عکس آگهی — حرفه‌ای و با placeholder */}
      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized // برای لوکال و مسیرهای /uploads
            priority={false}
          />
        ) : (
          // Placeholder زیبا وقتی عکس نیست
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-20 h-20 bg-white/40 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-3 shadow-xl">
              {icons[category] || icons.apartment}
            </div>
            <span className="text-gray-500 font-medium text-sm">
              {t("detailsPage.noImage")}
            </span>
          </div>
        )}

        {/* برچسب دسته‌بندی روی عکس */}
        <div className={`absolute top-4 ${locale === 'fa' || locale === 'ar' ? 'right-4' : 'left-4'} bg-gradient-to-r from-[#304ffe] to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10`}>
          {categoryLabels[category] || category}
        </div>

        {/* گرادیانت پایین عکس */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>

      {/* محتوا */}
      <div className="p-6 space-y-4">
        {/* عنوان */}
        <h3 className="font-extrabold text-lg text-gray-800 line-clamp-2 leading-relaxed group-hover:text-[#304ffe] transition-colors duration-300">
          {title}
        </h3>

        {/* مکان */}
        <p className="flex items-center text-sm text-gray-600">
          <HiOutlineLocationMarker className="ml-2 text-lg text-[#304ffe]" />
          <span className="truncate font-medium">{location}</span>
        </p>

        {/* قیمت — برجسته و جذاب */}
        <div className={`flex items-center justify-between ${locale === 'fa' || locale === 'ar' ? '' : 'flex-row-reverse'}`}>
          <div className="bg-gradient-to-r from-[#304ffe] to-blue-600 text-white px-5 py-3 rounded-2xl font-bold text-lg shadow-lg">
            {sp(price)} {locale === 'fa' ? 'تومان' : locale === 'ar' ? 'ريال' : 'Toman'}
          </div>

          {/* آیکون دسته‌بندی پایین */}
          <div className="w-12 h-12 bg-gradient-to-br from-[#304ffe]/10 to-blue-600/10 rounded-2xl flex items-center justify-center text-[#304ffe] shadow-md">
            {icons[category] || icons.apartment}
          </div>
        </div>

        {/* دکمه مشاهده */}
        <Link
          href={`/buy-residential/${_id}`}
          className={`flex items-center justify-between w-full bg-gradient-to-r from-[#304ffe] to-blue-600 hover:from-blue-600 hover:to-[#304ffe] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 ${locale === 'fa' || locale === 'ar' ? '' : 'flex-row-reverse'}`}
        >
          <span className="text-base">{t("common.viewAd")}</span>
          <BiLeftArrowAlt className={`text-2xl transform group-hover:${locale === 'fa' || locale === 'ar' ? '-translate-x-3' : 'translate-x-3'} transition-transform duration-500`} />
        </Link>
      </div>

      {/* افکت درخشش هنگام هاور */}
      <div className="absolute inset-0 rounded-3xl ring-4 ring-[#304ffe]/0 group-hover:ring-[#304ffe]/20 transition-all duration-500 pointer-events-none" />
    </div>
  );
}

export default Card;
