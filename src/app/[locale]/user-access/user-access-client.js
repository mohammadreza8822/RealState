"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import UsersTable from "@/module/UsersTable";
import styles from "./UserAccess.module.css";
import Loader from "@/module/Loader";

export default function UserAccessPage() {
  const t = useTranslations();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user || session.user.role !== "SUPERADMIN") {
      router.push("/");
    } else {
      fetchUsers();
    }
  }, [session, status, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/user-access");
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setUsers(data.data);
      }
    } catch (err) {
      toast.error(t("userAccess.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (email, newRole) => {
    try {
      const res = await fetch("/api/user-access", {
        method: "PATCH",
        body: JSON.stringify({ email, role: newRole }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        fetchUsers(); // بروزرسانی لیست کاربران
      }
    } catch (err) {
      toast.error(t("userAccess.changeError"));
    }
  };

  if (status === "loading" || loading) {
    return <Loader />;
  }

  if (!session || !session.user || session.user.role !== "SUPERADMIN") {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1>{t("userAccess.title")}</h1>
      <div className={styles.content}>
        <div className={styles.accessLevels}>
          <h2>{t("userAccess.accessLevels")}</h2>

          <div className={styles.accessCard}>
            <h3>{t("userAccess.superAdmin")}</h3>
            <ul>
              <li>{t("userAccess.superAdminDesc1")}</li>
              <li>{t("userAccess.superAdminDesc2")}</li>
              <li>{t("userAccess.superAdminDesc3")}</li>
              <li>{t("userAccess.superAdminDesc4")}</li>
              <li>{t("userAccess.superAdminDesc5")}</li>
              <li>{t("userAccess.superAdminDesc6")}</li>
              <li>{t("userAccess.superAdminDesc7")}</li>
            </ul>
          </div>

          <div className={styles.accessCard}>
            <h3>{t("userAccess.admin")}</h3>
            <ul>
              <li>{t("userAccess.adminDesc1")}</li>
              <li>{t("userAccess.adminDesc2")}</li>
              <li>{t("userAccess.adminDesc3")}</li>
              <li>{t("userAccess.adminDesc4")}</li>
              <li>{t("userAccess.adminDesc5")}</li>
              <li>{t("userAccess.adminDesc6")}</li>
              <li>{t("userAccess.adminDesc7")}</li>
            </ul>
          </div>

          <div className={styles.accessCard}>
            <h3>{t("userAccess.user")}</h3>
            <ul>
              <li>{t("userAccess.userDesc1")}</li>
              <li>{t("userAccess.userDesc2")}</li>
              <li>{t("userAccess.userDesc3")}</li>
              <li>{t("userAccess.userDesc4")}</li>
              <li>{t("userAccess.userDesc5")}</li>
              <li>{t("userAccess.userDesc6")}</li>
              <li>{t("userAccess.userDesc7")}</li>
            </ul>
          </div>
        </div>

        <div className={styles.usersSection}>
          <h2>{t("userAccess.userManagement")}</h2>
          <UsersTable users={users} onRoleChange={handleRoleChange} />
        </div>

        <div className={styles.info}>
          <h2>{t("userAccess.accessGuide")}</h2>
          <p>
            {t("userAccess.guideText1")}
          </p>
          <p>
            {t("userAccess.guideText2")}
          </p>
        </div>
      </div>
    </div>
  );
}
