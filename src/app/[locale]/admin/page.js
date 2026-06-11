import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import AdminPage from "@/template/AdminPage";
import DashboardSidebar from "@/layout/DashboardSidebar";
import { findUserByEmail, getUnpublishedProfiles } from "@/lib/repository";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "املاک | پنل کاربری",
};

async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  const user = await findUserByEmail(session.user.email);
  if (user.role !== "ADMIN") redirect("/dashboard");

  const profiles = await getUnpublishedProfiles();

  return (
    <DashboardSidebar role={user.role} email={user.email}>
      <AdminPage profiles={profiles} />
    </DashboardSidebar>
  );
}

export default Admin;
