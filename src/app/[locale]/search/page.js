"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function SearchPage() {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const q = searchParams.get("q") || "";
  const transaction = searchParams.get("transaction") || "";
  const type = searchParams.get("type") || "";

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (transaction) params.set("transaction", transaction);
        if (type) params.set("type", type);

        const res = await fetch(`/api/search?${params.toString()}`);
        const data = await res.json();

        if (res.ok) {
          setAds(data.ads || []);
          console.log(data.ads);
        } else {
          alert(t("search.fetchError"));
        }
      } catch (err) {
        console.error(err);
        alert(t("search.serverError"));
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [q, transaction, type, t]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-[#304ffe]">
          {t("search.loading")}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#304ffe] mb-6">
          {t("search.title")}
        </h1>

        <p className="text-center text-lg text-gray-600 mb-12">
          {q && (
            <span>
              {t("search.searchFor")} <strong>{q}</strong> |{" "}
            </span>
          )}
          {ads.length} {t("search.adsFound")}
        </p>

        {ads.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-600 mb-4">
              {t("search.noAdsFound")}
            </h2>
            <p className="text-gray-500">{t("search.tryOtherWords")}</p>
            <Link
              href="/"
              className="inline-block mt-8 px-8 py-4 bg-[#304ffe] text-white rounded-xl font-bold"
            >
              {t("search.backToHome")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ads.map((ad) => (
              <Link
                href={`/buy-residential/${ad._id}`}
                key={ad._id}
                className="block group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 bg-gray-100">
                    {ad.image ? (
                      <Image
                        src={ad.image}
                        alt={ad.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        {t("search.noImage")}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#304ffe] transition line-clamp-2">
                      {ad.title}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p>{ad.location}</p>
                      <p>{t("search.realEstate")} {ad.realState}</p>
                      <p>
                        {t("search.category")} {t(`search.categories.${ad.category}`) || ad.category}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-2xl font-extrabold text-[#304ffe]">
                        {ad.price.toLocaleString(locale === 'fa' ? 'fa-IR' : locale === 'ar' ? 'ar-SA' : 'en-US')} {locale === 'fa' ? 'تومان' : locale === 'ar' ? 'ريال' : 'Toman'}
                      </span>
                      <span className="bg-blue-100 text-[#304ffe] px-4 py-2 rounded-full text-sm font-bold">
                        {ad.published ? t("buyResidential.published") : t("buyResidential.pending")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
