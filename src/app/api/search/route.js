import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const q = searchParams.get("q")?.trim() || "";
    const transaction = searchParams.get("transaction") || "";
    const type = searchParams.get("type") || "";

    // فقط آگهی‌های منتشر شده
    const filter = { published: true };

    // جستجو در عنوان، توضیحات و مکان
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { realState: { $regex: q, $options: "i" } },
      ];
    }

    // فیلتر نوع ملک
    if (type && type !== "همه املاک") {
      const categoryMap = {
        "آپارتمان مسکونی": "apartment",
        "خانه ویلایی": "villa",
        "مغازه و تجاری": "store",
        "دفتر اداری": "office",
      };
      filter.category = categoryMap[type] || type;
    }

    // فیلتر نوع معامله (خرید / اجاره / رهن و اجاره / رهن کامل)
    // چون تو مدل فیلد transaction نیست، از قیمت تشخیص می‌دیم!
    // (اگه بعداً فیلد transaction اضافه کردی، این قسمت رو آپدیت کن)
    if (transaction && transaction !== "خرید") {
      // فرض: اگر قیمت کمتر از ۱ میلیارد باشه → اجاره/رهن، وگرنه خرید
      // این فقط یه راه‌حل موقت هست تا وقتی فیلد transaction رو اضافه کنی
      if (transaction.includes("اجاره") || transaction.includes("رهن")) {
        filter.price = { $lt: 1_000_000_000 }; // کمتر از ۱ میلیارد → اجاره/رهن
      }
    }

    const ads = await Profile.find(filter)
      .select(
        "title location phone realState price category constructionDate amenities images published createdAt"
      )
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return new Response(
      JSON.stringify({
        ads,
        count: ads.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("خطا در API جستجو:", error);
    return new Response(JSON.stringify({ error: "خطایی در سرور رخ داد" }), {
      status: 500,
    });
  }
}
