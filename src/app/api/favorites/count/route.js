// app/api/favorites/count/route.js

import { getFavoriteCount } from "@/lib/repository";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ count: 0 }), { status: 200 });
    }

    const count = await getFavoriteCount(session.user.email);

    return new Response(JSON.stringify({ count }), { status: 200 });
  } catch (err) {
    console.error("خطا در count favorites:", err);
    return new Response(JSON.stringify({ count: 0 }), { status: 200 });
  }
}
