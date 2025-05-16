import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/models/Profile";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

async function MyProfiles() {
  await connectDB();
  const session = await getServerSession(authOptions);
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
  console.log(user);
  const profiles = await Profile.find({ userId: session.user._id });

  return <div>MyProfiles</div>;
}

export default MyProfiles;
