"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UsersTable from "@/module/UsersTable";
import styles from "./UserAccess.module.css";
import Loader from "@/module/Loader";

function UserAccessPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "SUPERADMIN") {
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
      toast.error("خطا در دریافت اطلاعات کاربران");
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
      toast.error("خطا در تغییر نقش کاربر");
    }
  };

  if (status === "loading" || loading) {
    return <Loader />;
  }

  if (!session || session.user.role !== "SUPERADMIN") {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1>دسترسی کاربران</h1>
      <div className={styles.content}>
        <div className={styles.accessLevels}>
          <h2>سطوح دسترسی</h2>

          <div className={styles.accessCard}>
            <h3>Super Admin</h3>
            <ul>
              <li>دسترسی به تمام بخش‌های سیستم</li>
              <li>مدیریت و اعطای دسترسی Admin</li>
              <li>مدیریت کلیه کاربران و محتوا</li>
              <li>دسترسی به گزارشات و تنظیمات سیستم</li>
              <li>نظارت بر عملکرد Admin‌ها</li>
            </ul>
          </div>

          <div className={styles.accessCard}>
            <h3>Admin</h3>
            <ul>
              <li>مدیریت آگهی‌ها و محتوا</li>
              <li>تایید و بررسی آگهی‌های جدید</li>
              <li>مدیریت کاربران عادی</li>
              <li>دسترسی به گزارشات پایه</li>
            </ul>
          </div>
        </div>

        <div className={styles.usersSection}>
          <h2>مدیریت کاربران</h2>
          <UsersTable users={users} onRoleChange={handleRoleChange} />
        </div>

        <div className={styles.info}>
          <h2>راهنمای مدیریت دسترسی‌ها</h2>
          <p>
            تنها Super Admin می‌تواند دسترسی Admin را به کاربران اعطا کند. برای
            تغییر سطح دسترسی یک کاربر، از دکمه‌های موجود در جدول استفاده کنید.
          </p>
          <p>
            توجه: اعطای دسترسی Admin باید با دقت و پس از بررسی‌های لازم انجام
            شود.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserAccessPage;
