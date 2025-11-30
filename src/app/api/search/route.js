import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const q = searchParams.get("q")?.trim() || "";
    const transaction = searchParams.get("transaction") || "";
    const type = searchParams.get("type") || "";

    const filter = { published: true };

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { realState: { $regex: q, $options: "i" } },
      ];
    }

    if (type && type !== "همه املاک") {
      const categoryMap = {
        "آپارتمان مسکونی": "apartment",
        "خانه ویلایی": "villa",
        "مغازه و تجاری": "store",
        "دفتر اداری": "office",
      };
      filter.category = categoryMap[type] || type;
    }

    if (transaction && transaction !== "خرید") {
      if (transaction.includes("اجاره") || transaction.includes("رهن")) {
        filter.price = { $lt: 1_000_000_000 };
      }
    }

    const ads = await Profile.find(filter)
      .select(
        "title location phone realState price category constructionDate amenities image published createdAt"
      )
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

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
