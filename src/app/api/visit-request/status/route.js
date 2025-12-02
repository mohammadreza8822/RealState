// app/api/visit-request/status/route.js

import { NextResponse } from "next/server";
import VisitRequest from "@/models/VisitRequest";
import connectDB from "@/utils/connectDB";

export async function PATCH(request) {
  try {
    await connectDB();

    const { requestId, status } = await request.json();

    if (!requestId || !status) {
      return NextResponse.json(
        { message: "requestId و status الزامی هستند" },
        { status: 400 }
      );
    }

    const updated = await VisitRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "درخواست یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("خطا در بروزرسانی وضعیت:", error);
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}
