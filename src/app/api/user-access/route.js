import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
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
    await connectDB();

    const body = await req.json();
    const { email, role } = body;

    if (!email || !role) {
      return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    user.role = role;
    await user.save();

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
