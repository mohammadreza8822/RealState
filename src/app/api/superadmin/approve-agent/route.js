import { findUserById, updateUserById } from "@/lib/repository";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = await request.json();
    const id = userId.toString();

    const user = await findUserById(id);

    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    if (user.agentStatus !== "pending") {
      return NextResponse.json(
        { error: "این درخواست قبلاً پردازش شده" },
        { status: 400 }
      );
    }

    await updateUserById(id, {
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
