import { NextResponse } from "next/server";
import {
  getUsersExcludingSuperadmin,
  findUserByEmail,
  updateUserByEmail,
} from "@/lib/repository";

export async function GET() {
  try {
    const users = await getUsersExcludingSuperadmin();
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات کاربران" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { email, role } = body;

    if (!email || !role) {
      return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    if (user.role === "SUPERADMIN") {
      return NextResponse.json(
        { error: "امکان تغییر نقش SUPERADMIN وجود ندارد" },
        { status: 403 }
      );
    }

    await updateUserByEmail(email, { role });

    return NextResponse.json(
      { message: "نقش کاربر با موفقیت تغییر کرد" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "خطا در بروزرسانی نقش کاربر" },
      { status: 500 }
    );
  }
}
