"use client";

import Link from "next/link";
import Image from "next/image";

function CategoryCard({ title, name }) {
  return (
    <div className="group relative shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/20">
      <Link href={`/buy-residential?category=${name}`} className="block">
        {/* لایه بک‌گراند محو (Glass Effect) */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl transition-all duration-500 group-hover:bg-white/20 group-hover:backdrop-blur-lg" />

        {/* عکس */}
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={`/images/${name}.png`}
            alt={title}
            width={240}
            height={144}
            priority={true}
            className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
          />

          {/* افکت محو روی عکس وقتی هاور می‌شه (اختیاری ولی خیلی قشنگه) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* عنوان */}
        <p className="relative text-center text-xl font-bold text-primary my-4 drop-shadow-2xl z-10">
          {title}
        </p>
      </Link>
    </div>
  );
}

export default CategoryCard;
