"use client";

import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { useTranslations } from "next-intl";
import LogOutButton from "@/module/LogOutButton";
import styles from "@/layout/DashboardSidebar.module.css";

function DashboardSidebarClient({ children, role, email }) {
  const t = useTranslations();
  
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <CgProfile />
        {role === "ADMIN" ? <p>{t("sidebar.admin")}</p> : null}
        <p>{email}</p>
        <span></span>
        <Link href={"/dashboard"}>{t("sidebar.userAccount")}</Link>
        <Link href={"/dashboard/my-profiles"}>{t("sidebar.myAds")}</Link>
        <Link href={"/dashboard/add"}>{t("sidebar.addAd")}</Link>
        {role === "SUPERADMIN" ? (
          <Link href={"/dashboard/superadmin/agent-requests"}>
            {t("sidebar.manageAdmins")}
          </Link>
        ) : null}

        {role === "ADMIN" || role === "SUPERADMIN" ? (
          <>
            <Link href={"/admin"}>{t("sidebar.pendingApproval")}</Link>
            <Link href={"/contact-us-answers"}>{t("sidebar.contactMessages")}</Link>
            <Link href={"/admin/visit-requests"}>{t("sidebar.visitRequests")}</Link>
          </>
        ) : null}
        <div className="size-14">
          <LogOutButton />
        </div>
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}

export default DashboardSidebarClient;
