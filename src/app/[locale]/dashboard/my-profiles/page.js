import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import Profile from "@/models/Profile";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import MyProfilesPage from "@/template/MyProfilesPage";

export const dynamic = 'force-dynamic';

async function MyProfiles() {
  await connectDB();
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/signin");
  }

  const [user] = await User.aggregate([
    { $match: { email: session.user.email } },
    {
      $lookup: {
        from: "profiles",
        foreignField: "userId",
        localField: "_id",
        as: "profiles",
      },
    },
  ]);

  if (!user) {
    return <MyProfilesPage profiles={[]} />;
  }

  return <MyProfilesPage profiles={user.profiles || []} />;
}

export default MyProfiles;
