// app/api/favorites/count/route.js

import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ count: 0 }), { status: 200 });
    }

    const user = await User.findOne({ email: session.user.email }).select(
      "favorites"
    );

    // اگه کاربر favorites نداشته باشه، صفر برگردون
    const count = user?.favorites ? user.favorites.length : 0;

    return new Response(JSON.stringify({ count }), { status: 200 });
  } catch (err) {
    console.error("خطا در count favorites:", err);
    return new Response(JSON.stringify({ count: 0 }), { status: 200 });
  }
}
