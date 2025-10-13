import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";

export async function POST(req) {
  try {
    // چک کردن دسترسی SUPERADMIN
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "SUPERADMIN") {
      return NextResponse.json({ error: "دسترسی غیر مجاز" }, { status: 403 });
    }

    await connectDB();

    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    // ایجاد session جدید برای کاربر
    const response = NextResponse.json(
      {
        success: true,
        user: {
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // تنظیم کوکی های مورد نیاز برای لاگین
    response.cookies.set({
      name: "next-auth.session-token",
      value: JSON.stringify({
        email: user.email,
        role: user.role,
      }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "خطا در ورود به حساب کاربری" },
      { status: 500 }
    );
  }
}
