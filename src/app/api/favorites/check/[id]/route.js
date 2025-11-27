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

    const { id } = params;
    const user = await User.findOne({ email: session.user.email });

    const isFavorite = user.favorites.includes(id);

    return new Response(JSON.stringify({ isFavorite }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ isFavorite: false }), { status: 200 });
  }
}
