import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import DashboardSidebar from "@/layout/DashboardSidebar";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "املاک | پنل کاربری",
  description: "سایت خرید و فروش املاک",
};

async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email });

  if (!user) return <h3>Something went wrong</h3>;

  return (
    <DashboardSidebar role={user.role} email={user.email}>
      {children}
    </DashboardSidebar>
  );
}

export default DashboardLayout;
