// app/api/superadmin/reject-agent/route.js

import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { userId } = await request.json();
    const id = userId.toString();

    await User.findByIdAndUpdate(id, {
      agentStatus: "rejected",
    });

    return NextResponse.json({ message: "درخواست با موفقیت رد شد" });
  } catch (error) {
    console.error("خطا در reject-agent:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
