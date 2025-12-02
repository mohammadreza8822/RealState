import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password, role } = await req.json();

    // اعتبارسنجی ورودی‌ها
    if (!email || !password) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید." },
        { status: 422 }
      );
    }

    // بررسی وجود کاربر
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "این حساب کاربری قبلاً ثبت شده است." },
        { status: 422 }
      );
    }

    // هش کردن پسورد
    const hashedPassword = await hashPassword(password);

    // ایجاد کاربر جدید با نقش

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    console.log("کاربر جدید ایجاد شد:", newUser);

    return NextResponse.json(
      {
        message: "حساب کاربری با موفقیت ایجاد شد!",
        data: { email: newUser.email, role: newUser.role },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("خطا در ثبت‌نام:", err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است. دوباره تلاش کنید." },
      { status: 500 }
    );
  }
}
