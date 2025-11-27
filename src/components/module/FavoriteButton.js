"use client";

import { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FavoriteButton({ adId, size = "normal" }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && adId) {
      fetch(`/api/favorites/check/${adId}`, { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => setIsFavorite(data.isFavorite))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [status, adId]);

  const toggleFavorite = async () => {
    if (status !== "authenticated") {
      router.push("/signin");
      return;
    }

    const res = await fetch(`/api/favorites/${adId}`, { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setIsFavorite(data.isFavorite);
    }
  };

  if (loading) return null;

  const sizeClasses =
    size === "large"
      ? "w-12 h-12 text-2xl shadow-xl"
      : "w-8 h-8 text-xl shadow-md";

  return (
    <button
      onClick={toggleFavorite}
      className={`
        ${sizeClasses} rounded-full flex items-center justify-center
        transition-all duration-500 transform hover:scale-110 active:scale-95
        ${
          isFavorite
            ? "bg-red-500 text-white shadow-red-500/50"
            : "bg-white/95 backdrop-blur-sm text-gray-700 border-2 border-gray-200"
        }
      `}
    >
      <FiHeart className={isFavorite ? "fill-current" : ""} />
    </button>
  );
}
