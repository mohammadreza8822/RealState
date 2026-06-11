import Image from "next/image";

function isExternalSrc(src) {
  return typeof src === "string" && src.startsWith("http");
}

export default function ListingImage({
  src,
  alt,
  fill = true,
  className = "object-cover",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
}) {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={isExternalSrc(src)}
    />
  );
}
