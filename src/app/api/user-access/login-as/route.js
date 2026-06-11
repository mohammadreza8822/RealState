import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { findUserByEmail } from "@/lib/repository";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "SUPERADMIN") {
      return NextResponse.json({ error: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const { email } = await req.json();
    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

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
