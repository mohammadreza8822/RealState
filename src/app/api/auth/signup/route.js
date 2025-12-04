import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password, requestAgent } = await req.json();

    // اعتبارسنجی
    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی است" },
        { status: 422 }
      );
    }

    // بررسی تکراری بودن ایمیل
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "این ایمیل قبلاً ثبت شده است" },
        { status: 422 }
      );
    }

    // هش رمز
    const hashedPassword = await hashPassword(password);

    // ایجاد کاربر — همیشه با نقش USER
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: "USER",
      agentStatus: requestAgent ? "pending" : "none",
      agentRequestedAt: requestAgent ? new Date() : null,
    });

    console.log("کاربر جدید ثبت شد:", {
      email: newUser.email,
      role: newUser.role,
      agentStatus: newUser.agentStatus,
    });

    // پیام متفاوت برای مشاور و کاربر عادی
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
