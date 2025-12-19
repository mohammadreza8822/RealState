import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardPage from "@/template/DashboardPage";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

// این export باعث میشه صفحه dynamic بشه و در build time اجرا نشه
export const dynamic = 'force-dynamic';

async function Dashboard() {
  await connectDB();
  const session = await getServerSession(authOptions);
  
  // بررسی session برای جلوگیری از خطا در build time
  if (!session || !session.user) {
    redirect("/signin");
  }

  const user = await User.findOne({ email: session.user.email });
  
  // بررسی user برای جلوگیری از خطا
  if (!user) {
    redirect("/signin");
  }

  return <DashboardPage createdAt={user.createdAt} />;
}

export default Dashboard;
