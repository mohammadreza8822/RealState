"use client";

import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import HomeIcon from "@/public/images/home-icon.svg";
import Image from "next/image";
import { useState, useEffect } from "react";

function Header() {
  const { data } = useSession();
  const isSuperAdmin = data?.user?.role === "SUPERADMIN";

  // حالت استیکی بودن هدر
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#304ffe] shadow-lg" : "mt-6"
      }`}
    >
      <div
        className={`max-w-[1200px] mx-auto bg-[#304ffe] text-white px-6 py-4 transition-all duration-300 ${
          isScrolled ? "rounded-none" : "rounded-xl shadow-md mx-4"
        }`}
      >
        <nav className="flex flex-row justify-between items-center">
          <ul className="flex flex-row items-center gap-6">
            <Image
              src={HomeIcon}
              alt="خانه"
              width={25}
              height={25}
              className="brightness-0 invert"
            />
            <li>
              <Link
                href="/"
                className="hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link
                href="/buy-residential"
                className="hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                آگهی ها
              </Link>
            </li>
            {isSuperAdmin && (
              <li>
                <Link
                  href="/user-access"
                  className="hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  دسترسی کاربران
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/about"
                className="hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                درباره ما
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                تماس با ما
              </Link>
            </li>
          </ul>

          {data ? (
            <div>
              <Link
                href="/dashboard"
                className="flex items-center bg-white text-[#304ffe] px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium"
              >
                <FaUserAlt className="text-xl" />
              </Link>
            </div>
          ) : (
            <div>
              <Link
                href="/signin"
                className="flex items-center bg-white text-[#304ffe] px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium"
              >
                <FiLogIn className="text-xl" />
                <span className="mr-2">ورود</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
