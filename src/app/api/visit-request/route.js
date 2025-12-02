// app/api/visit-request/route.js
import connectDB from "@/utils/connectDB";
import VisitRequest from "@/models/VisitRequest";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // لاگ برای دیباگ (بعداً می‌تونی حذف کنی)
    console.log("دریافت درخواست بازدید:", body);

    // اعتبارسنجی ضروری
    const {
      listingId,
      listingTitle,
      location,
      name,
      phone,
      preferredDate,
      preferredTime = "",
      email = "",
      message = "",
    } = body;

    if (
      !listingId ||
      !listingTitle ||
      !location ||
      !name ||
      !phone ||
      !preferredDate
    ) {
      return Response.json(
        { message: "اطلاعات ضروری ناقص است" },
        { status: 400 }
      );
    }

    if (!/^\d{11}$/.test(phone) || !phone.startsWith("09")) {
      return Response.json(
        { message: "شماره تلفن نامعتبر است" },
        { status: 400 }
      );
    }

    // تبدیل تاریخ از رشته به Date — نسخه ضدگلوله!
    let visitDate;
    try {
      // روش ۱: استفاده از تاریخ محلی (بهترین روش برای تاریخ بدون ساعت)
      const [year, month, day] = preferredDate.split("-").map(Number);
      visitDate = new Date(year, month - 1, day); // ماه در جاوااسکریپت از 0 شروع میشه

      // چک کنیم تاریخ معتبر باشه
      if (
        visitDate.getFullYear() !== year ||
        visitDate.getMonth() !== month - 1 ||
        visitDate.getDate() !== day
      ) {
        throw new Error("تاریخ خارج از محدوده");
      }
    } catch (err) {
      return Response.json({ message: "تاریخ نامعتبر است" }, { status: 400 });
    }

    // ساخت درخواست
    const newRequest = await VisitRequest.create({
      listingId,
      listingTitle,
      location,
      userName: name.trim(),
      userPhone: phone,
      userEmail: email.trim() || null,
      preferredDate: visitDate,
      preferredTime: preferredTime.trim(),
      message: message.trim(),
    });

    console.log("درخواست بازدید با موفقیت ذخیره شد:", newRequest._id);

    return Response.json(
      {
        message: "درخواست بازدید با موفقیت ثبت شد",
        requestId: newRequest._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("خطا در ثبت درخواست بازدید:", error);
    return Response.json(
      { message: "خطا در سرور. لطفاً مجدد تلاش کنید" },
      { status: 500 }
    );
  }
}
