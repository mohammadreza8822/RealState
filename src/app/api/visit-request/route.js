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
      return Response.json({ code: "MISSING_FIELDS" }, { status: 400 });
    }

    const digits = phone.replace(/\D/g, "");
    const isIranPhone = /^\d{11}$/.test(digits) && digits.startsWith("09");
    const isIntlPhone = digits.length >= 10 && digits.length <= 11;
    if (!isIranPhone && !isIntlPhone) {
      return Response.json({ code: "INVALID_PHONE" }, { status: 400 });
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
        throw new Error("OUT_OF_RANGE");
      }
    } catch {
      return Response.json({ code: "INVALID_DATE" }, { status: 400 });
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
      { code: "SUCCESS", requestId: newRequest._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Visit request error:", error);
    return Response.json({ code: "SERVER_ERROR" }, { status: 500 });
  }
}
