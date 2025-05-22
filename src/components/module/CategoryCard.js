import Link from "next/link";
import styles from "@/module/CategoryCard.module.css";
import Image from "next/image";

function CategoryCard({ title, name }) {
  return (
    <div className={styles.card}>
      <Link href={`/but-residential?category=${name}`}>
        <Image
          src={`/images/${name}.png`}
          alt={title}
          width={240}
          height={144}
          priority={true}
        />
        <p>{title}</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
