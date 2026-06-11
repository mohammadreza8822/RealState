"use client";

import { FiUserPlus, FiUserMinus, FiLogIn } from "react-icons/fi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useTranslations, useLocale } from "next-intl";
import { isRTLLocale } from "@/utils/locale";

function UsersTable({ users, onRoleChange }) {
  const t = useTranslations("usersTable");
  const locale = useLocale();
  const isRTL = isRTLLocale(locale);
  const textAlign = isRTL ? "text-right" : "text-left";
  const dateLocale =
    locale === "fa" ? "fa-IR" : locale === "ar" ? "ar-SA" : "en-US";

  const handleLoginAs = async (email) => {
    try {
      const res = await fetch("/api/user-access/login-as", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(t("loggingIn"));
        await signOut({ redirect: false });
        window.location.href = "/";
      }
    } catch {
      toast.error(t("loginError"));
    }
  };

  const filteredUsers = users.filter((user) => user.role !== "SUPERADMIN");

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-md animate-fadeIn">
        <thead>
          <tr>
            <th className={`p-4 ${textAlign} bg-primary text-white font-bold`}>
              {t("email")}
            </th>
            <th className={`p-4 ${textAlign} bg-primary text-white font-bold`}>
              {t("role")}
            </th>
            <th className={`p-4 ${textAlign} bg-primary text-white font-bold`}>
              {t("joinedAt")}
            </th>
            <th className={`p-4 ${textAlign} bg-primary text-white font-bold`}>
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className={`p-4 ${textAlign} border-b border-gray-100`} dir="ltr">
                {user.email}
              </td>
              <td className={`p-4 ${textAlign} border-b border-gray-100`}>
                {user.role}
              </td>
              <td className={`p-4 ${textAlign} border-b border-gray-100`}>
                {new Date(user.createdAt).toLocaleDateString(dateLocale)}
              </td>
              <td className={`p-4 ${textAlign} border-b border-gray-100 flex flex-wrap gap-2`}>
                {user.role === "ADMIN" ? (
                  <button
                    onClick={() => onRoleChange(user.email, "USER")}
                    className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    <FiUserMinus />
                    {t("revokeAdmin")}
                  </button>
                ) : (
                  <button
                    onClick={() => onRoleChange(user.email, "ADMIN")}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                  >
                    <FiUserPlus />
                    {t("grantAdmin")}
                  </button>
                )}
                <button
                  onClick={() => handleLoginAs(user.email)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                  <FiLogIn />
                  {t("loginAs")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
