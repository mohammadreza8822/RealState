// src/app/admin/visit-requests/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/utils/connectDB";
import VisitRequest from "@/models/VisitRequest";
import Profile from "@/models/Profile";
import AdminVisitRequestsTable from "@/module/AdminVisitRequestsTable";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();
  return { title: `${t("admin.visitRequests")} | Admin` };
}

async function getRequests(t) {
  await connectDB();
  const requests = await VisitRequest.find({}).sort({ createdAt: -1 }).lean();

  const enriched = await Promise.all(
    requests.map(async (req) => {
      const listing = await Profile.findById(req.listingId)
        .select("title image")
        .lean();
      return {
        ...req,
        listingTitle: listing?.title || t("admin.deletedListing"),
        listingImage: listing?.image?.[0] || null,
      };
    })
  );

  return JSON.parse(JSON.stringify(enriched)); // برای سریالایز شدن در کلاینت
}

export default async function VisitRequestsPage() {
  const t = await getTranslations();
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")
  ) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">{t("admin.accessDenied")}</h1>
          <p>{t("admin.adminOnly")}</p>
        </div>
      </div>
    );
  }

  const requests = await getRequests(t);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-8 text-white">
            <h1 className="text-4xl font-bold text-center">
              {t("admin.visitRequests")}
            </h1>
            <p className="text-center mt-3 text-lg opacity-90">
              {t("common.total")}: {requests.length} {t("common.items")}
            </p>
          </div>

          <div className="p-6">
            <AdminVisitRequestsTable initialRequests={requests} />
          </div>
        </div>
      </div>
    </div>
  );
}
