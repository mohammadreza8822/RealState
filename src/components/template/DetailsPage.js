import { BiCalendarCheck } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SiHomebridge } from "react-icons/si";
import { sp } from "@/utils/replaceNumber";
import ItemList from "@/module/ItemList";
import Title from "@/module/Title";
import ShareButton from "@/module/ShareButton";
import { icons } from "@/constants/icons";
import FavoriteButton from "../module/FavoriteButton.js";
import Image from "next/image";

function DetailsPage({
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
    image, // فیلد جدید برای عکس
  },
}) {
  const categories = {
    apartment: "آپارتمان مسکونی",
    villa: "ویلا",
    store: "مغازه و تجاری",
    office: "دفتر اداری",
  };

  const persianDate = new Date(constructionDate).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // اگر image آرایه باشه، اولین عکس رو نشون بده
  const mainImage = Array.isArray(image) ? image[0] : image;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* بخش اصلی آگهی */}
          <div className="lg:col-span-2 space-y-10">
            {/* عکس آگهی - لوکس و تمام‌صفحه */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="relative h-[400px] md:h-[500px] group">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized // برای لوکال و مسیرهای /uploads
                    priority={true} // لود سریع‌تر برای عکس اصلی
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="w-24 h-24 bg-white/30 rounded-3xl flex items-center justify-center mb-4 shadow-xl">
                      {icons[category] || icons.apartment}
                    </div>
                    <span className="text-gray-500 font-medium text-lg">
                      بدون تصویر
                    </span>
                  </div>
                )}

                {/* گرادیانت پایین عکس برای خوانایی */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

                {/* برچسب دسته‌بندی روی عکس */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#304ffe] to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {categories[category]}
                </div>

                {/* تعداد عکس‌ها (اگر آرایه بود) */}
                {Array.isArray(image) && image.length > 1 && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-bold text-[#304ffe] shadow-lg">
                    {image.length} عکس
                  </div>
                )}
              </div>
            </div>

            {/* عنوان + قلب ذخیره */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
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

                <div className="flex-shrink-0">
                  <FavoriteButton adId={_id} size="large" />
                </div>
              </div>
            </div>

            {/* توضیحات */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <Title title="توضیحات کامل آگهی" />
              <p className="text-gray-700 leading-8 text-justify whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* امکانات */}
            {amenities?.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <Title title="امکانات رفاهی" />
                <ItemList data={amenities} />
              </div>
            )}

            {/* قوانین */}
            {rules?.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <Title title="قوانین" />
                <ItemList data={rules} />
              </div>
            )}
          </div>

          {/* سایدبار اطلاعات */}
          <div className="space-y-6">
            {/* اطلاعات مشاور */}
            <div className="bg-white rounded-3xl shadow-2xl border border-[#304ffe]/10 overflow-hidden">
              <div className="bg-gradient-to-r from-[#304ffe] to-blue-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <SiHomebridge className="text-3xl" />
                  </div>
                  <div>
                    <p className="text-sm opacity-90">املاک</p>
                    <p className="text-xl font-bold">{realState}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-3 w-full bg-[#304ffe] text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  تماس با مشاور
                </a>

                <div className="text-center">
                  <p className="text-3xl font-black text-[#304ffe]">
                    {sp(price)} تومان
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-gray-700">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-[#304ffe]">
                      {icons[category]}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">دسته‌بندی</p>
                      <p className="font-bold">{categories[category]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-700">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                      <BiCalendarCheck className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">تاریخ ساخت</p>
                      <p className="font-bold">{persianDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
