import styles from "@/module/SideBar.module.css";
import Link from "next/link";
import { HiFilter } from "react-icons/hi";

function SideBar() {
  const queries = [
    { villa: "ویلا" },
    { apartment: "آپارتمان" },
    { office: "دفتر" },
    { store: "مغازه" },
  ];
  return (
    <div className={styles.container}>
      <p>
        <HiFilter />
        دسته بندی
      </p>
      <Link href={"/buy-residential"}>همه</Link>
      {queries.map((query) => (
        <Link
          href={{
            pathname: "/buy-residential",
            query: { category: Object.keys(query) },
          }}
        >
          {Object.values(query)}
        </Link>
      ))}
    </div>
  );
}

export default SideBar;
