import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Profile from "@/models/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "لطفاً وارد شوید" }), {
        status: 401,
      });
    }

    const { id } = params;
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return new Response(JSON.stringify({ error: "کاربر یافت نشد" }), {
        status: 404,
      });
    }

    // این خط حیاتیه — اگه favorites وجود نداشته باشه، یه آرایه خالی بساز
    if (!user.favorites) user.favorites = [];

    const adIndex = user.favorites.indexOf(id);

    if (adIndex === -1) {
      user.favorites.push(id);
    } else {
      user.favorites.splice(adIndex, 1);
    }

    await user.save();

    return new Response(
      JSON.stringify({
        message:
          adIndex === -1
            ? "به علاقه‌مندی‌ها اضافه شد"
            : "از علاقه‌مندی‌ها حذف شد",
        isFavorite: adIndex === -1,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("خطا در favorites API:", err);
    return new Response(JSON.stringify({ error: "خطا در سرور" }), {
      status: 500,
    });
  }
}
