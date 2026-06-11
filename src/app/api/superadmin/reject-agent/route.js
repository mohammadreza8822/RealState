import { updateUserById } from "@/lib/repository";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = await request.json();
    const id = userId.toString();

    await updateUserById(id, { agentStatus: "rejected" });

    return NextResponse.json({ message: "درخواست با موفقیت رد شد" });
  } catch (error) {
    console.error("خطا در reject-agent:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
