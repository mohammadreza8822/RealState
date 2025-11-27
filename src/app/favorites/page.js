import BuyResidentialPage from "@/template/BuyResidentialPage";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Profile from "@/models/Profile";
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

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  const favorites = await Profile.find({
    _id: { $in: user.favorites },
    published: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-5xl font-extrabold text-center text-[#304ffe] mb-10">
          علاقه‌مندی‌های من
        </h1>
        {favorites.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            هنوز آگهی ذخیره نکرده‌اید
          </p>
        ) : (
          <BuyResidentialPage data={favorites} />
        )}
      </div>
    </div>
  );
}
