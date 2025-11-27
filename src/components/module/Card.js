import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { sp } from "@/utils/replaceNumber";
import { icons } from "@/constants/icons";

function Card({ data: { _id, category, title, location, price } }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#304ffe]/20">
      {/* بک‌گراند گرادیانت ظریف هنگام هاور */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#304ffe]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* آیکون دسته‌بندی — لوکس و بزرگ */}
      <div className="p-5">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#304ffe] to-blue-600 text-white shadow-xl transform group-hover:scale-110 transition-all duration-300">
          <span className="text-2xl">{icons[category]}</span>
        </div>
      </div>

      {/* عنوان */}
      <div className="px-5 pb-3">
        <h3 className="font-extrabold text-lg text-gray-800 line-clamp-2 leading-relaxed group-hover:text-[#304ffe] transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* مکان */}
      <div className="px-5 pb-4">
        <p className="flex items-center text-sm text-gray-600">
          <HiOutlineLocationMarker className="ml-1.5 text-lg text-[#304ffe]" />
          <span className="line-clamp-1 font-medium">{location}</span>
        </p>
      </div>

      {/* قیمت — برجسته و جذاب */}
      <div className="px-5 pb-6">
        <div className="inline-flex items-center bg-gradient-to-r from-[#304ffe] to-blue-600 text-white px-5 py-3 rounded-full font-bold text-lg shadow-lg">
          {sp(price)} تومان
        </div>
      </div>

      {/* دکمه مشاهده آگهی — انیمیشن دار و خفن */}
      <div className="px-5 pb-5">
        <Link
          href={`/buy-residential/${_id}`}
          className="flex items-center justify-between w-full bg-gray-50 group-hover:bg-[#304ffe] text-gray-700 group-hover:text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform group-hover:-translate-y-1"
        >
          <span className="text-base">مشاهده آگهی</span>
          <BiLeftArrowAlt className="text-2xl transform group-hover:-translate-x-2 transition-transform duration-300" />
        </Link>
      </div>

      {/* افکت نورانی هنگام هاور */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#304ffe]/10 via-transparent to-cyan-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-20 rounded-2xl" />
    </div>
  );
}

export default Card;
