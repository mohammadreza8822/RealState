"use client";

import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { FiLogIn, FiMenu, FiX, FiHeart } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import HomeIcon from "@/public/images/home-icon.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import LanguageSwitcher from "@/module/LanguageSwitcher";

function Header() {
  const { data, status } = useSession();
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'fa' || locale === 'ar';
  const isSuperAdmin = data?.user?.role === "SUPERADMIN";
  const isAdmin = data?.user?.role === "ADMIN" || isSuperAdmin;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  // تعداد علاقه‌مندی‌ها رو از سرور بگیر (اختیاری ولی خفن!)
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/favorites/count", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => setFavoritesCount(data.count || 0))
        .catch(() => setFavoritesCount(0));
    }
  }, [status]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: t("header.home") },
    { href: "/buy-residential", label: t("header.ads") },
    ...(isSuperAdmin
      ? [{ href: "/user-access", label: t("header.userAccess") }]
      : []),
    { href: "/about", label: t("header.about") },
    { href: "/contact", label: t("header.contact") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-xl shadow-2xl py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* لوگو و منو دسکتاپ */}
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#304ffe] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={HomeIcon}
                    alt={t("header.home")}
                    width={28}
                    height={28}
                    className="brightness-0 invert"
                  />
                </div>
                <span className="font-bold text-2xl text-[#304ffe]">
                  {t("header.siteName")}
                </span>
              </Link>

              <nav className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-medium text-lg text-[#304ffe] hover:text-blue-700 transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* دکمه‌ها + منوی موبایل */}
            <div className="flex items-center gap-4">
              {/* تغییر زبان */}
              <LanguageSwitcher />
              
              {/* فقط وقتی لاگین کرده — دکمه علاقه‌مندی‌ها و داشبورد */}
              {data ? (
                <>
                  {/* دکمه علاقه‌مندی‌ها — قرمز و خفن */}
                  <Link
                    href="/favorites"
                    className="relative flex items-center gap-3 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <FiHeart className="text-xl" />
                    {t("common.favorites")}
                    {favoritesCount > 0 && (
                      <span className={`absolute ${isRTL ? '-right-2' : '-left-2'} -top-2 bg-white text-red-500 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-pulse`}>
                        {favoritesCount}
                      </span>
                    )}
                  </Link>

                  {/* دکمه داشبورد */}
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 bg-gradient-to-r from-[#304ffe] to-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <FaUserAlt className="text-xl" />
                    {t("common.dashboard")}
                  </Link>
                </>
              ) : (
                /* دکمه ورود */
                <Link
                  href="/signin"
                  className="flex items-center gap-3 bg-white text-[#304ffe] px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-[#304ffe]"
                >
                  <FiLogIn className="text-xl" />
                  {t("common.login")}
                </Link>
              )}

              {/* همبرگری موبایل — */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-4 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/50 text-gray-900 shadow-xl hover:bg-white/50 transition-all duration-300"
                style={{ minWidth: "56px", minHeight: "56px" }} // برای تاچ بهتر تو موبایل
              >
                {isMobileMenuOpen ? (
                  <FiX className="text-2xl" />
                ) : (
                  <FiMenu className="text-2xl" />
                )}
              </button>
            </div>
          </div>

          {/* منوی موبایل — با علاقه‌مندی‌ها */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-200">
              <nav className="flex flex-col py-6 px-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-4 text-lg font-medium text-[#304ffe] hover:text-blue-700 border-b border-gray-100 last:border-0"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* علاقه‌مندی‌ها تو منوی موبایل */}
                {data && (
                  <Link
                    href="/favorites"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-4 text-lg font-bold text-red-500 flex items-center gap-3 border-b border-gray-100"
                  >
                    <FiHeart className="text-xl fill-current" />
                    {t("common.myFavorites")}
                    {favoritesCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {favoritesCount}
                      </span>
                    )}
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
