import { NextResponse } from "next/server";
import { hashPassword } from "@/utils/auth";
import { findUserByEmail, createUser } from "@/lib/repository";

export async function POST(req) {
  try {
    const { email, password, requestAgent } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی است" },
        { status: 422 }
      );
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "این ایمیل قبلاً ثبت شده است" },
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      email,
      password: hashedPassword,
      role: "USER",
      agentStatus: requestAgent ? "pending" : "none",
      agentRequestedAt: requestAgent ? new Date() : null,
    });

    const message = requestAgent
      ? "ثبت‌نام انجام شد! درخواست شما برای مشاور شدن در انتظار تأیید مدیر است"
      : "حساب کاربری با موفقیت ایجاد شد!";

    return NextResponse.json(
      {
        message,
        data: { email: newUser.email, role: "USER" },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("خطا در ثبت‌نام:", err);
    return NextResponse.json(
      { error: "خطای سرور. دوباره تلاش کنید" },
      { status: 500 }
    );
  }
}
