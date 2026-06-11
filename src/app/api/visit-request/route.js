// app/api/visit-request/route.js
import { createVisitRequest } from "@/lib/repository";

export async function POST(request) {
  try {
    const body = await request.json();

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

    let visitDate;
    try {
      const [year, month, day] = preferredDate.split("-").map(Number);
      visitDate = new Date(year, month - 1, day);

      if (
        visitDate.getFullYear() !== year ||
        visitDate.getMonth() !== month - 1 ||
        visitDate.getDate() !== day
      ) {
        throw new Error("تاریخ خارج از محدوده");
      }
    } catch {
      return Response.json({ message: "تاریخ نامعتبر است" }, { status: 400 });
    }

    const newRequest = await createVisitRequest({
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
