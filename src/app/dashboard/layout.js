import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardSidebar from "@/layout/DashboardSidebar";

async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return <DashboardSidebar>{children}</DashboardSidebar>;
}

export default DashboardLayout;
