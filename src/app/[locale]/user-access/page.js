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
          <h2>سطوح دسترسی و اختیارات</h2>

          <div className={styles.accessCard}>
            <h3>مدیر کل سیستم (Super Admin)</h3>
            <ul>
              <li>دسترسی نامحدود به تمام بخش‌های سامانه</li>
              <li>مدیریت و نظارت بر عملکرد مدیران سیستم</li>
              <li>اعطا و سلب دسترسی‌های مدیریتی</li>
              <li>مشاهده و تحلیل گزارش‌های جامع عملکرد</li>
              <li>تنظیمات پیشرفته امنیتی و دسترسی‌ها</li>
              <li>مدیریت سیاست‌های کلی سامانه</li>
              <li>نظارت بر تراکنش‌ها و فعالیت‌های مالی</li>
            </ul>
          </div>

          <div className={styles.accessCard}>
            <h3>مدیر سیستم (Admin)</h3>
            <ul>
              <li>مدیریت و بررسی آگهی‌های ثبت شده</li>
              <li>تایید و اعتبارسنجی اطلاعات کاربران</li>
              <li>پاسخگویی به درخواست‌های پشتیبانی</li>
              <li>مدیریت محتوای بخش‌های عمومی سایت</li>
              <li>دسترسی به گزارش‌های عملکردی روزانه</li>
              <li>بررسی و رسیدگی به شکایات کاربران</li>
              <li>نظارت بر فعالیت‌های مشاوران املاک</li>
            </ul>
          </div>

          <div className={styles.accessCard}>
            <h3>کاربر عادی (User)</h3>
            <ul>
              <li>ثبت و مدیریت آگهی‌های شخصی</li>
              <li>جستجو و مشاهده آگهی‌های ملک</li>
              <li>برقراری ارتباط با صاحبان املاک</li>
              <li>ذخیره و نشان‌گذاری آگهی‌های مورد علاقه</li>
              <li>دریافت مشاوره از کارشناسان</li>
              <li>ثبت نظر و امتیاز برای آگهی‌ها</li>
              <li>دسترسی به پنل کاربری شخصی</li>
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
