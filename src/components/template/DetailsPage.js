import { BiCalendarCheck } from "react-icons/bi";
import { SiHomebridge } from "react-icons/si";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
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
    apartment: "آپارتمان",
    villa: "ویلا",
    store: "مغازه",
    office: "دفتر",
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 p-4 md:p-8">
      <div className="flex-[3] space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <span className="flex items-center gap-2 text-gray-600">
          <HiOutlineLocationMarker className="text-primary-700" />
          {location}
        </span>
        <Title>توضیحات</Title>
        <p className="text-gray-700 leading-7">{description}</p>
        <Title>امکانات</Title>
        <ItemList data={amenities} />
        <Title>قوانین</Title>
        <ItemList data={rules} />
      </div>
      <div className="flex-1 space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg space-y-4">
          <SiHomebridge className="text-primary-600 text-xl" />
          <p className="font-bold">املاک {realState}</p>
          <span className="flex items-center gap-2 text-gray-600">
            <AiOutlinePhone className="text-primary-600" />
            {e2p(phone)}
          </span>
        </div>
        <ShareButton />
        <div className="bg-gray-100 p-4 rounded-lg space-y-4">
          <p className="flex items-center gap-2 text-gray-700">
            {icons[category]}
            {categories[category]}
          </p>
          <p className="text-lg font-bold text-gray-800">{sp(price)} تومان</p>
          <p className="flex items-center gap-2 text-gray-600">
            <BiCalendarCheck className="text-primary-600" />
            {new Date(constructionDate).toLocaleString("fa", "ir")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
