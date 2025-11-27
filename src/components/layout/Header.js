"use client";

import Link from "next/link";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import HomeIcon from "@/public/images/home-icon.svg";
import Image from "next/image";
import { useState, useEffect } from "react";

function Header() {
  const { data } = useSession();
  const isSuperAdmin = data?.user?.role === "SUPERADMIN";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "صفحه اصلی" },
    { href: "/buy-residential", label: "آگهی‌ها" },
    ...(isSuperAdmin
      ? [{ href: "/user-access", label: "دسترسی کاربران" }]
      : []),
    { href: "/about", label: "درباره ما" },
    { href: "/contact", label: "تماس با ما" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/90 backdrop-blur-xl shadow-2xl py-3" : "py-6"
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
                    alt="خانه"
                    width={28}
                    height={28}
                    className="brightness-0 invert"
                  />
                </div>
                <span className="font-bold text-2xl text-[#304ffe]">
                  سامانه املاک
                </span>
              </Link>

              {/* منوی دسکتاپ — متن‌ها آبی شدن */}
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

            {/* دکمه ورود/داشبورد + منوی موبایل */}
            <div className="flex items-center gap-4">
              {data ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 bg-gradient-to-r from-[#304ffe] to-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <FaUserAlt className="text-xl" />
                  داشبورد
                </Link>
              ) : (
                <Link
                  href="/signin"
                  className="flex items-center gap-3 bg-white text-[#304ffe] px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-[#304ffe]"
                >
                  <FiLogIn className="text-xl" />
                  ورود
                </Link>
              )}

              {/* دکمه همبرگری موبایل */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-3 rounded-xl ${
                  isScrolled
                    ? "bg-gray-100 text-gray-800"
                    : "bg-white/20 text-white"
                }`}
              >
                {isMobileMenuOpen ? (
                  <FiX className="text-2xl" />
                ) : (
                  <FiMenu className="text-2xl" />
                )}
              </button>
            </div>
          </div>

          {/* منوی موبایل — متن‌ها آبی */}
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
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
