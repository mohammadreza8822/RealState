"use client";

import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";

function Header() {
  const { data } = useSession();
  const isSuperAdmin = data?.user?.role === "SUPERADMIN";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-4">
      <div className="max-w-[1200px] mx-auto bg-[#304ffe] text-white rounded-xl px-6 py-4 my-6 shadow-md">
        <nav className="flex flex-row justify-between items-center">
          <ul className="flex flex-row items-center gap-6">
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
