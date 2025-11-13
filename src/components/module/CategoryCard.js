"use client";

import Link from "next/link";
import Image from "next/image";

function CategoryCard({ title, name }) {
  return (
    <div className="shadow-lg shadow-primary/20 rounded-2xl overflow-hidden p-3 transition-all duration-300 hover:-rotate-3 hover:shadow-xl group">
      <Link href={`/buy-residential?category=${name}`}>
        <div className="overflow-hidden rounded-xl">
          <Image
            src={`/images/${name}.png`}
            alt={title}
            width={240}
            height={144}
            priority={true}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <p className="text-xl text-primary text-center font-medium my-3">
          {title}
        </p>
      </Link>
    </div>
  );
}

export default CategoryCard;
