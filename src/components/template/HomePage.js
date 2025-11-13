import { FiCircle } from "react-icons/fi";
import CategoryCard from "@/module/CategoryCard";
import { FaCity } from "react-icons/fa";
import { cities, services } from "@/constants/strings";

function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col justify-center items-center rounded-2xl p-8 mt-32 mb-16 animate-fadeIn">
        <div className="w-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-8 animate-fade-in-up">
            سامانه خرید و اجاره ملک
          </h1>
          <ul className="flex flex-wrap justify-center gap-4 mt-8">
            {services.map((service) => (
              <li
                key={service}
                className="flex items-center bg-blue-100 text-primary px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-200"
              >
                <FiCircle className="ml-2" />
                <span className="font-medium">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-16 animate-pop">
        <CategoryCard title="خانه ویلایی" name="villa" />
        <CategoryCard title="آپارتمان" name="apartment" />
        <CategoryCard title="مغازه" name="store" />
        <CategoryCard title="دفتر" name="office" />
      </div>

      <div className="my-24 animate-fadeIn">
        <h3 className="text-4xl font-bold text-primary text-center mb-12">
          شهر های پر بازدید
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <li
              key={city}
              className="flex justify-center items-center bg-blue-100 text-primary text-lg p-4 rounded-xl hover:bg-blue-200 transition-all duration-200 hover:shadow-md"
            >
              <FaCity className="ml-3 text-xl" />
              <span className="font-medium">{city}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
