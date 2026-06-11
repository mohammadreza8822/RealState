// app/api/visit-schedule/route.js
import {
  addVisitAvailability,
  removeVisitAvailability,
} from "@/lib/repository";

export async function POST(req) {
  const { listingId, date, timeSlots } = await req.json();

  await addVisitAvailability(listingId, date, timeSlots);

  return Response.json({ success: true });
}

export async function DELETE(req) {
  const { listingId, date } = await req.json();

  await removeVisitAvailability(listingId, date);

  return Response.json({ success: true });
}
