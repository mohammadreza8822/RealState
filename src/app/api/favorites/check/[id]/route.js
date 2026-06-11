import { isFavorite } from "@/lib/repository";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return new Response(JSON.stringify({ isFavorite: false }), {
        status: 200,
      });

    const { id } = await params;

    if (!id) {
      return new Response(JSON.stringify({ isFavorite: false }), {
        status: 200,
      });
    }

    const favorite = await isFavorite(session.user.email, id);

    return new Response(JSON.stringify({ isFavorite: favorite }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error checking favorite:", err);
    return new Response(JSON.stringify({ isFavorite: false }), { status: 200 });
  }
}
