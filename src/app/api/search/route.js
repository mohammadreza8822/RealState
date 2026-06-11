import { searchProfiles } from "@/lib/repository";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const q = searchParams.get("q")?.trim() || "";
    const transaction = searchParams.get("transaction") || "";
    const type = searchParams.get("type") || "";

    const ads = await searchProfiles({ q, transaction, type });

    return NextResponse.json({
      ads,
      count: ads.length,
    });
  } catch (error) {
    console.error("خطا در API جستجو:", error);
    return NextResponse.json(
      { error: "خطایی در سرور رخ داد" },
      { status: 500 }
    );
  }
}
