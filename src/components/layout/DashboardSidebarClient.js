"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { isRTLLocale } from "@/utils/locale";
import {
  FiUser,
  FiHome,
  FiPlusCircle,
  FiUsers,
  FiCheckSquare,
  FiMail,
  FiCalendar,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { signOut } from "next-auth/react";

function NavItem({ href, icon: Icon, label, isActive, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-[#304ffe] text-white shadow-md shadow-blue-200"
          : "text-gray-600 hover:bg-blue-50 hover:text-[#304ffe]"
      }`}
    >
      <Icon className="text-lg shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function DashboardSidebarClient({ children, role, email }) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = isRTLLocale(locale);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMobile = () => setMobileOpen(false);

  const userLinks = [
    { href: "/dashboard", icon: FiUser, label: t("sidebar.userAccount") },
    { href: "/dashboard/my-profiles", icon: FiHome, label: t("sidebar.myAds") },
    { href: "/dashboard/add", icon: FiPlusCircle, label: t("sidebar.addAd") },
  ];

  const adminLinks =
    role === "ADMIN" || role === "SUPERADMIN"
      ? [
          { href: "/admin", icon: FiCheckSquare, label: t("sidebar.pendingApproval") },
          { href: "/contact-us-answers", icon: FiMail, label: t("sidebar.contactMessages") },
          { href: "/admin/visit-requests", icon: FiCalendar, label: t("sidebar.visitRequests") },
        ]
      : [];

  const superAdminLinks =
    role === "SUPERADMIN"
      ? [
          {
            href: "/dashboard/superadmin/agent-requests",
            icon: FiUsers,
            label: t("sidebar.manageAdmins"),
          },
        ]
      : [];

  const roleLabel =
    role === "SUPERADMIN"
      ? t("sidebar.superAdmin")
      : role === "ADMIN"
        ? t("sidebar.admin")
        : t("sidebar.user");

  const sidebarContent = (
    <>
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#304ffe] to-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shrink-0">
            {email?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{email}</p>
            <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-[#304ffe]">
              {roleLabel}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
          {t("sidebar.accountSection")}
        </p>
        {userLinks.map((link) => (
          <NavItem
            key={link.href}
            {...link}
            isActive={isActive(link.href)}
            onClick={closeMobile}
          />
        ))}

        {superAdminLinks.length > 0 && (
          <>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mt-6 mb-2">
              {t("sidebar.adminSection")}
            </p>
            {superAdminLinks.map((link) => (
              <NavItem
                key={link.href}
                {...link}
                isActive={isActive(link.href)}
                onClick={closeMobile}
              />
            ))}
          </>
        )}

        {adminLinks.length > 0 && (
          <>
            {!superAdminLinks.length && (
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mt-6 mb-2">
                {t("sidebar.adminSection")}
              </p>
            )}
            {adminLinks.map((link) => (
              <NavItem
                key={link.href}
                {...link}
                isActive={isActive(link.href)}
                onClick={closeMobile}
              />
            ))}
          </>
        )}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <FiLogOut className="text-lg" />
          {t("common.logout")}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-gradient-to-br from-slate-50 via-white to-blue-50/40">
      {/* Mobile bar */}
      <div className="lg:hidden sticky top-[4.5rem] z-30 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl bg-blue-50 text-[#304ffe] hover:bg-blue-100 transition"
          aria-label={t("sidebar.menu")}
        >
          <FiMenu className="text-xl" />
        </button>
        <span className="font-semibold text-gray-800">{t("dashboard.title")}</span>
        <div className="w-10" />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeMobile}
          aria-label={t("common.close")}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="flex gap-6 lg:gap-8 items-start">
          {/* Sidebar */}
          <aside
            className={`
              fixed top-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col
              lg:sticky lg:top-24 lg:z-auto lg:shadow-md lg:rounded-2xl lg:border lg:border-gray-100
              transition-transform duration-300 ease-in-out
              ${isRTL ? "right-0" : "left-0"}
              ${mobileOpen ? "translate-x-0" : isRTL ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-[#304ffe]">{t("dashboard.title")}</span>
              <button
                type="button"
                onClick={closeMobile}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            {sidebarContent}
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebarClient;
