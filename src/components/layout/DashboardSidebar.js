import Link from "next/link";
import { getServerSession } from "next-auth";
import { CgProfile } from "react-icons/cg";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogOutButton from "@/module/LogOutButton";
import styles from "@/layout/DashboardSidebar.module.css";

async function DashboardSidebar({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <CgProfile />
        <p>{session?.user.email}</p>
        <span></span>
        <Link href={"/dashboard"}>حساب کاربری</Link>
        <Link href={"/dashboard/my-profiles"}>آگهی های من</Link>
        <Link href={"/dashboard/add"}>ثبت آگهی</Link>
        <LogOutButton />
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}

export default DashboardSidebar;
