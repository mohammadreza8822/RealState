"use client";

import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";
import { FiEdit, FiTrash2, FiExternalLink } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { isRTLLocale } from "@/utils/locale";
import { translateApiCode } from "@/utils/apiMessages";
import { sp } from "@/utils/replaceNumber";
import { icons } from "@/constants/icons";
import ListingImage from "./ListingImage";
import Loader from "./Loader";

function DashboardCard({ data }) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = isRTLLocale(locale);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { _id, category, title, location, price, image } = data;
  const mainImage = Array.isArray(image) ? image[0] : image;

  const categoryLabels = {
    villa: t("detailsPage.categories.villa"),
    apartment: t("detailsPage.categories.apartment"),
    store: t("detailsPage.categories.store"),
    office: t("detailsPage.categories.office"),
  };

  const formattedPrice = isRTL
    ? `${sp(price)} ${locale === "fa" ? "تومان" : "ريال"}`
    : `$${price.toLocaleString("en-US")}`;

  const editHandler = () => {
    router.push(`/dashboard/my-profiles/${_id}`);
  };

  const deleteHandler = async () => {
    if (!confirm(t("dashboardCard.confirmDelete"))) return;

    setLoading(true);
    const res = await fetch(`/api/profile/delete/${_id}`, { method: "DELETE" });
    const result = await res.json();
    setLoading(false);

    if (result.error) {
      toast.error(translateApiCode(t, result.error));
    } else {
      toast.success(translateApiCode(t, result.message));
      router.refresh();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-52 h-44 sm:h-auto sm:min-h-[160px] shrink-0 bg-gray-100">
          {mainImage ? (
            <ListingImage
              src={mainImage}
              alt={title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#304ffe]/40">
              {icons[category] || icons.apartment}
            </div>
          )}
          <span className="absolute top-3 left-3 bg-[#304ffe] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {categoryLabels[category] || category}
          </span>
        </div>

        <div className="flex-1 p-5 flex flex-col justify-between gap-4 min-w-0">
          <div>
            <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-snug">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-2 truncate">{location}</p>
            <p className="text-xl font-bold text-[#304ffe] mt-3">{formattedPrice}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={editHandler}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-green-200 text-green-700 bg-green-50 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
            >
              <FiEdit />
              {t("dashboardCard.edit")}
            </button>

            {loading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={deleteHandler}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-red-200 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
              >
                <FiTrash2 />
                {t("dashboardCard.delete")}
              </button>
            )}

            <Link
              href={`/buy-residential/${_id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-blue-200 text-[#304ffe] bg-blue-50 hover:bg-[#304ffe] hover:text-white hover:border-[#304ffe] transition-all"
            >
              <FiExternalLink />
              {t("dashboardCard.view")}
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default DashboardCard;
