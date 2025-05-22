import { BiCalendarCheck } from "react-icons/bi";
import { SiHomebridge } from "react-icons/si";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { e2p, sp } from "@/utils/replaceNumber";
import ItemList from "@/module/ItemList";
import Title from "@/module/Title";
import styles from "@/template/DetailsPage.module.css";
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
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>{title}</h1>
        <span>
          <HiOutlineLocationMarker />
          {location}
        </span>
        <Title>توضیحات</Title>
        <p>{description}</p>
        <Title>امکانات</Title>
        <ItemList data={amenities} />
        <Title>قوانین</Title>
        <ItemList data={rules} />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.realState}>
          <SiHomebridge />
          <p>املاک {realState}</p>
          <span>
            <AiOutlinePhone />
            {e2p(phone)}
          </span>
        </div>
        <ShareButton />
        <div className={styles.price}>
          <p>
            {icons[category]}
            {categories[category]}
          </p>
          <p>{sp(price)} تومان</p>
          <p>
            <BiCalendarCheck />
            {new Date(constructionDate).toLocaleString("fa", "ir")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
