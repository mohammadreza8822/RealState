import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import LogOutButton from "@/module/LogOutButton";
import styles from "@/layout/DashboardSidebar.module.css";

async function DashboardSidebar({ children, role, email }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <CgProfile />
        {role === "ADMIN" ? <p>ادمین</p> : null}
        <p>{email}</p>
        <span></span>
        <Link href={"/dashboard"}>حساب کاربری</Link>
        <Link href={"/dashboard/my-profiles"}>آگهی های من</Link>
        <Link href={"/dashboard/add"}>ثبت آگهی</Link>
        {role === "ADMIN" ? <Link href={"/admin"}>در انتظار تایید</Link> : null}
        <LogOutButton />
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}

export default DashboardSidebar;
