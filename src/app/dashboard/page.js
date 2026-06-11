import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardPage from "@/template/DashboardPage";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { findUserByEmail } from "@/lib/repository";

export const dynamic = "force-dynamic";

async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/signin");
  }

  const user = await findUserByEmail(session.user.email);

  if (!user) {
    redirect("/signin");
  }

  return <DashboardPage createdAt={user.createdAt} />;
}

export default Dashboard;
