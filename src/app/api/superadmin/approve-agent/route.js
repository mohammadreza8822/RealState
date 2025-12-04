// app/api/superadmin/approve-agent/route.js   ←← این مسیر درست باشه

import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { userId } = await request.json();

    // تبدیل ObjectId به string (این خط خیلی مهمه!)
    const id = userId.toString();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    if (user.agentStatus !== "pending") {
      return NextResponse.json(
        { error: "این درخواست قبلاً پردازش شده" },
        { status: 400 }
      );
    }

    // تبدیل به ADMIN = مشاور فعال
    await User.findByIdAndUpdate(id, {
      role: "ADMIN",
      agentStatus: "approved",
      agentApprovedAt: new Date(),
    });

    return NextResponse.json({
      message: "مشاور با موفقیت تأیید و فعال شد!",
    });
  } catch (error) {
    console.error("خطا در approve-agent:", error);
    return NextResponse.json(
      { error: "خطای سرور، دوباره تلاش کنید" },
      { status: 500 }
    );
  }
}
