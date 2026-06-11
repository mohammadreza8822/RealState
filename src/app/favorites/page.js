import BuyResidentialPage from "@/template/BuyResidentialPage";
import { getFavoriteProfiles } from "@/lib/repository";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-700">لطفاً وارد شوید</h2>
        <p className="text-gray-500 mt-4">
          برای دیدن علاقه‌مندی‌ها باید وارد حساب کاربری شوید
        </p>
      </div>
    );
  }

  const favorites = await getFavoriteProfiles(session.user.email);

  if (!favorites.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-5xl font-extrabold text-center text-[#304ffe] mb-10">
            علاقه‌مندی‌های من
          </h1>
          <p className="text-center text-xl text-gray-600">
            هنوز آگهی ذخیره نکرده‌اید
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-5xl font-extrabold text-center text-[#304ffe] mb-10">
          علاقه‌مندی‌های من
        </h1>
        <BuyResidentialPage data={favorites} />
      </div>
    </div>
  );
}
