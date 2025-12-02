// app/api/visit-schedule/route.js
import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";

export async function POST(req) {
  await connectDB();
  const { listingId, date, timeSlots } = await req.json();

  await Profile.findByIdAndUpdate(listingId, {
    $push: { visitAvailability: { date, timeSlots } },
  });

  return Response.json({ success: true });
}

export async function DELETE(req) {
  await connectDB();
  const { listingId, date } = await req.json();

  await Profile.findByIdAndUpdate(listingId, {
    $pull: { visitAvailability: { date } },
  });

  return Response.json({ success: true });
}
