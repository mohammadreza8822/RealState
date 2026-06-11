import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import MyProfilesPage from "@/template/MyProfilesPage";
import { getUserWithProfiles } from "@/lib/repository";

export const dynamic = "force-dynamic";

async function MyProfiles() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/signin");
  }

  const user = await getUserWithProfiles(session.user.email);

  if (!user) {
    return <MyProfilesPage profiles={[]} />;
  }

  return <MyProfilesPage profiles={user.profiles || []} />;
}

export default MyProfiles;
