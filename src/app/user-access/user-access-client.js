"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UsersTable from "@/module/UsersTable";
import styles from "./UserAccess.module.css";
import Loader from "@/module/Loader";

// Default translations for non-locale route
const translations = {
  fa: {
    title: "دسترسی کاربران",
    accessLevels: "سطوح دسترسی و اختیارات",
    superAdmin: "مدیر کل سیستم (Super Admin)",
    admin: "مدیر سیستم (Admin)",
    user: "کاربر عادی (User)",
    userManagement: "مدیریت کاربران",
    accessGuide: "راهنمای مدیریت دسترسی‌ها",
    superAdminDesc1: "دسترسی نامحدود به تمام بخش‌های سامانه",
    superAdminDesc2: "مدیریت و نظارت بر عملکرد مدیران سیستم",
    superAdminDesc3: "اعطا و سلب دسترسی‌های مدیریتی",
    superAdminDesc4: "مشاهده و تحلیل گزارش‌های جامع عملکرد",
    superAdminDesc5: "تنظیمات پیشرفته امنیتی و دسترسی‌ها",
    superAdminDesc6: "مدیریت سیاست‌های کلی سامانه",
    superAdminDesc7: "نظارت بر تراکنش‌ها و فعالیت‌های مالی",
    adminDesc1: "مدیریت و بررسی آگهی‌های ثبت شده",
    adminDesc2: "تایید و اعتبارسنجی اطلاعات کاربران",
    adminDesc3: "پاسخگویی به درخواست‌های پشتیبانی",
    adminDesc4: "مدیریت محتوای بخش‌های عمومی سایت",
    adminDesc5: "دسترسی به گزارش‌های عملکردی روزانه",
    adminDesc6: "بررسی و رسیدگی به شکایات کاربران",
    adminDesc7: "نظارت بر فعالیت‌های مشاوران املاک",
    userDesc1: "ثبت و مدیریت آگهی‌های شخصی",
    userDesc2: "جستجو و مشاهده آگهی‌های ملک",
    userDesc3: "برقراری ارتباط با صاحبان املاک",
    userDesc4: "ذخیره و نشان‌گذاری آگهی‌های مورد علاقه",
    userDesc5: "دریافت مشاوره از کارشناسان",
    userDesc6: "ثبت نظر و امتیاز برای آگهی‌ها",
    userDesc7: "دسترسی به پنل کاربری شخصی",
    guideText1: "تنها Super Admin می‌تواند دسترسی Admin را به کاربران اعطا کند. برای تغییر سطح دسترسی یک کاربر، از دکمه‌های موجود در جدول استفاده کنید.",
    guideText2: "توجه: اعطای دسترسی Admin باید با دقت و پس از بررسی‌های لازم انجام شود.",
    fetchError: "خطا در دریافت اطلاعات کاربران",
    changeError: "خطا در تغییر نقش کاربر"
  }
};

const t = (key) => translations.fa[key] || key;

export default function UserAccessPage() {
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
      toast.error(t("fetchError"));
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
        fetchUsers();
      }
    } catch (err) {
      toast.error(t("changeError"));
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
      <h1>{t("title")}</h1>
      <div className={styles.content}>
        <div className={styles.accessLevels}>
          <h2>{t("accessLevels")}</h2>

          <div className={styles.accessCard}>
            <h3>{t("superAdmin")}</h3>
            <ul>
              <li>{t("superAdminDesc1")}</li>
              <li>{t("superAdminDesc2")}</li>
              <li>{t("superAdminDesc3")}</li>
              <li>{t("superAdminDesc4")}</li>
              <li>{t("superAdminDesc5")}</li>
              <li>{t("superAdminDesc6")}</li>
              <li>{t("superAdminDesc7")}</li>
            </ul>
          </div>

          <div className={styles.accessCard}>
            <h3>{t("admin")}</h3>
            <ul>
              <li>{t("adminDesc1")}</li>
              <li>{t("adminDesc2")}</li>
              <li>{t("adminDesc3")}</li>
              <li>{t("adminDesc4")}</li>
              <li>{t("adminDesc5")}</li>
              <li>{t("adminDesc6")}</li>
              <li>{t("adminDesc7")}</li>
            </ul>
          </div>

          <div className={styles.accessCard}>
            <h3>{t("user")}</h3>
            <ul>
              <li>{t("userDesc1")}</li>
              <li>{t("userDesc2")}</li>
              <li>{t("userDesc3")}</li>
              <li>{t("userDesc4")}</li>
              <li>{t("userDesc5")}</li>
              <li>{t("userDesc6")}</li>
              <li>{t("userDesc7")}</li>
            </ul>
          </div>
        </div>

        <div className={styles.usersSection}>
          <h2>{t("userManagement")}</h2>
          <UsersTable users={users} onRoleChange={handleRoleChange} />
        </div>

        <div className={styles.info}>
          <h2>{t("accessGuide")}</h2>
          <p>
            {t("guideText1")}
          </p>
          <p>
            {t("guideText2")}
          </p>
        </div>
      </div>
    </div>
  );
}
