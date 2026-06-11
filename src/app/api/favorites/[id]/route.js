import { findUserByEmail, toggleFavorite } from "@/lib/repository";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "لطفاً وارد شوید" }), {
        status: 401,
      });
    }

    const { id } = await params;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "شناسه آگهی ارسال نشده است" }),
        { status: 400 }
      );
    }

    const user = await findUserByEmail(session.user.email);

    if (!user) {
      return new Response(JSON.stringify({ error: "کاربر یافت نشد" }), {
        status: 404,
      });
    }

    const result = await toggleFavorite(session.user.email, id);

    if (!result) {
      return new Response(JSON.stringify({ error: "خطا در ذخیره اطلاعات" }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({
        message: result.isFavorite
          ? "به علاقه‌مندی‌ها اضافه شد"
          : "از علاقه‌مندی‌ها حذف شد",
        isFavorite: result.isFavorite,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("خطا در favorites API:", err);
    return new Response(
      JSON.stringify({ error: "خطا در سرور", details: err.message }),
      { status: 500 }
    );
  }
}
