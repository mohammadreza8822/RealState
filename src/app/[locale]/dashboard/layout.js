import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import DashboardSidebar from "@/layout/DashboardSidebar";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { getTranslations } from "next-intl/server";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `${t("dashboard.title")} | ${t("metadata.title")}`,
    description: t("metadata.description"),
};
}

async function DashboardLayout({ children }) {
  const t = await getTranslations();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email });

  if (!user) return <h3>{t("dashboard.error")}</h3>;

  return (
    <DashboardSidebar role={user.role} email={user.email}>
      {children}
    </DashboardSidebar>
  );
}

export default DashboardLayout;
