import BuyResidentialPage from "@/template/BuyResidentialPage";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Profile from "@/models/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getTranslations } from "next-intl/server";

export default async function FavoritesPage() {
  const t = await getTranslations();
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-700">{t("favorites.pleaseLogin")}</h2>
        <p className="text-gray-500 mt-4">
          {t("favorites.loginToSee")}
        </p>
      </div>
    );
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  
  if (!user || !user.favorites || !Array.isArray(user.favorites) || user.favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-5xl font-extrabold text-center text-[#304ffe] mb-10">
            {t("favorites.title")}
          </h1>
          <p className="text-center text-xl text-gray-600">
            {t("favorites.noFavorites")}
          </p>
        </div>
      </div>
    );
  }

  const favorites = await Profile.find({
    _id: { $in: user.favorites },
    published: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-5xl font-extrabold text-center text-[#304ffe] mb-10">
          {t("favorites.title")}
        </h1>
        {favorites.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            {t("favorites.noFavorites")}
          </p>
        ) : (
          <BuyResidentialPage data={favorites} />
        )}
      </div>
    </div>
  );
}
