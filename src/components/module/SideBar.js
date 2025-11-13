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
    <div className="flex flex-col animate-fadeIn">
      <p className="flex items-center text-xl mb-4">
        <HiFilter className="ml-2 text-2xl text-primary" />
        دسته بندی
      </p>
      <Link
        href="/buy-residential"
        className="text-gray-600 hover:text-primary my-1.5 transition-colors duration-200"
      >
        همه
      </Link>
      {queries.map((query) => (
        <Link
          href={{
            pathname: "/buy-residential",
            query: { category: Object.keys(query) },
          }}
          key={Object.keys(query)}
          className="text-gray-600 hover:text-primary my-1.5 transition-colors duration-200"
        >
          {Object.values(query)}
        </Link>
      ))}
    </div>
  );
}

export default SideBar;
