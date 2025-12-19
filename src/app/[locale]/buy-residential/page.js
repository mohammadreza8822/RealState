import BuyResidentialPage from "@/template/BuyResidentialPage";
import { getTranslations } from "next-intl/server";

export default async function BuyResidential({ searchParams }) {
  const t = await getTranslations();
  const category = searchParams?.category || null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/profile`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(t("buyResidential.serverError"));
    }

    const { data } = await res.json();

    if (!data || !Array.isArray(data)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-red-600 mb-4">
              {t("buyResidential.dataError")}
            </h3>
            <p className="text-gray-600">{t("buyResidential.tryAgain")}</p>
          </div>
        </div>
      );
    }

    // فقط آگهی‌های منتشر شده
    let finalData = data.filter((item) => item.published === true);

    // فیلتر بر اساس دسته‌بندی
    if (category && category !== "all") {
      finalData = finalData.filter((item) => item.category === category);
    }

    return <BuyResidentialPage data={finalData} />;
  } catch (error) {
    console.error("خطا در صفحه خرید ملک:", error);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-red-100">
          <div className="text-9xl mb-6 opacity-20">{t("buyResidential.error")}</div>
          <h3 className="text-4xl font-extrabold text-red-600 mb-6">
            {t("buyResidential.somethingWrong")}
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            {t("buyResidential.refreshPage")}
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.location.reload(); }}
            className="inline-block px-8 py-4 bg-[#304ffe] text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
          >
            {t("buyResidential.retry")}
          </a>
        </div>
      </div>
    );
  }
}

// اختیاری: متادیتا برای سئو
export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `${t("buyResidential.title")} | ${t("metadata.title")}`,
    description: t("metadata.description"),
  };
}
