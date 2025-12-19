import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session)
      return new Response(JSON.stringify({ isFavorite: false }), {
        status: 200,
      });

    // Unwrap params Promise (Next.js 15/16)
    const { id } = await params;
    
    if (!id) {
      return new Response(JSON.stringify({ isFavorite: false }), { status: 200 });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user || !user.favorites || !Array.isArray(user.favorites)) {
      return new Response(JSON.stringify({ isFavorite: false }), { status: 200 });
    }

    // Convert ObjectIds to strings for comparison
    const favoriteIds = user.favorites.map(fav => {
      if (fav && fav.toString) {
        return fav.toString();
      }
      return String(fav);
    });
    const idString = String(id);
    const isFavorite = favoriteIds.includes(idString);

    return new Response(JSON.stringify({ isFavorite }), { status: 200 });
  } catch (err) {
    console.error("Error checking favorite:", err);
    return new Response(JSON.stringify({ isFavorite: false }), { status: 200 });
  }
}
