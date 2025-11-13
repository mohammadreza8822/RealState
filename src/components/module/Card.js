import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { sp } from "@/utils/replaceNumber";
import { icons } from "@/constants/icons";

function Card({ data: { _id, category, title, location, price } }) {
  return (
    <div className="w-[250px] border-2 border-primary/30 rounded-xl p-3 m-3 hover:shadow-md transition-shadow duration-200">
      <div className="text-3xl">
        <div className="inline-block bg-primary/20 text-primary p-1 rounded-lg">
          {icons[category]}
        </div>
      </div>
      <p className="font-medium text-gray-800 my-3 line-clamp-1">{title}</p>
      <p className="flex items-center text-sm text-gray-500">
        <HiOutlineLocationMarker className="ml-1 text-base" />
        <span className="line-clamp-1">{location}</span>
      </p>
      <span className="block text-sm text-gray-500 font-medium mt-3">
        {sp(price)} تومان
      </span>
      <Link
        href={`/buy-residential/${_id}`}
        className="flex items-center justify-between mt-5 text-[0.95rem] text-primary hover:text-primary/80 transition-colors duration-200"
      >
        مشاهده آگهی <BiLeftArrowAlt className="text-xl" />
      </Link>
    </div>
  );
}

export default Card;
