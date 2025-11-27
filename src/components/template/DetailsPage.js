import { BiCalendarCheck, BiPhoneCall } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SiHomebridge } from "react-icons/si";
import { MdOutlineCategory } from "react-icons/md";
import { e2p, sp } from "@/utils/replaceNumber";
import ItemList from "@/module/ItemList";
import Title from "@/module/Title";
import ShareButton from "@/module/ShareButton";
import { icons } from "@/constants/icons";

function DetailsPage({
  data: {
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
  },
}) {
  const categories = {
    apartment: "آپارتمان مسکونی",
    villa: "ویلا",
    store: "مغازه و تجاری",
    office: "دفتر اداری",
  };

  // تبدیل تاریخ به فارسی
  const persianDate = new Date(constructionDate).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* بخش اصلی آگهی */}
          <div className="lg:col-span-2 space-y-10">
            {/* عنوان و مکان */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
                {title}
              </h1>
              <div className="flex items-center gap-3 text-lg text-gray-600">
                <HiOutlineLocationMarker className="text-2xl text-[#304ffe]" />
                <span className="font-medium">{location}</span>
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
                <Title
                  title="امکانات رفاهی"
                  icon={<span className="text-2xl">Check</span>}
                />
                <ItemList data={amenities} />
              </div>
            )}

            {/* قوانین */}
            {rules?.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <Title
                  title="قوانین"
                  icon={<span className="text-2xl">Warning</span>}
                />
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
                  <BiPhoneCall className="text-2xl" />
                  تماس با مشاور
                </a>

                <div className="text-center">
                  <p className="text-2xl font-black text-[#304ffe]">
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

            {/* دکمه اشتراک‌گذاری */}
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
