"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const categoryPersian = {
  villa: "خانه ویلایی",
  apartment: "آپارتمان مسکونی",
  store: "مغازه و تجاری",
  office: "دفتر اداری",
};

export default function SearchPage() {
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
        } else {
          alert("خطا در دریافت آگهی‌ها");
        }
      } catch (err) {
        console.error(err);
        alert("خطا در ارتباط با سرور");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [q, transaction, type]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-[#304ffe]">
          در حال بارگذاری...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#304ffe] mb-6">
          نتایج جستجو
        </h1>

        <p className="text-center text-lg text-gray-600 mb-12">
          {q && (
            <span>
              جستجو برای: <strong>{q}</strong> |{" "}
            </span>
          )}
          {ads.length} آگهی یافت شد
        </p>

        {ads.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-600 mb-4">
              هیچ آگهی یافت نشد
            </h2>
            <p className="text-gray-500">لطفاً کلمات دیگری امتحان کنید</p>
            <Link
              href="/"
              className="inline-block mt-8 px-8 py-4 bg-[#304ffe] text-white rounded-xl font-bold"
            >
              بازگشت به خانه
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ads.map((ad) => (
              <Link href={`/p/${ad._id}`} key={ad._id} className="block group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 bg-gray-100">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      تصویر موجود نیست
                    </div>
                    {/* اگه بعداً فیلد images اضافه کردی، اینو فعال کن */}
                    {/* {ad.images?.[0] && <Image src={ad.images[0]} fill alt={ad.title} className="object-cover" />} */}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#304ffe] transition line-clamp-2">
                      {ad.title}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p>{ad.location}</p>
                      <p>املاک: {ad.realState}</p>
                      <p>
                        دسته‌بندی: {categoryPersian[ad.category] || ad.category}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-2xl font-extrabold text-[#304ffe]">
                        {ad.price.toLocaleString("fa-IR")} تومان
                      </span>
                      <span className="bg-blue-100 text-[#304ffe] px-4 py-2 rounded-full text-sm font-bold">
                        {ad.published ? "در انتظار تایید" : "منتشر شده"}
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
