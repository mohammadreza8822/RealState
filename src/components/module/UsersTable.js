"use client";

import { FiUserPlus, FiUserMinus, FiLogIn } from "react-icons/fi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

function UsersTable({ users, onRoleChange }) {
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
        toast.success("در حال ورود به حساب کاربری...");
        await signOut({ redirect: false });
        window.location.href = "/";
      }
    } catch (err) {
      toast.error("خطا در ورود به حساب کاربری");
    }
  };
  // فیلتر کردن کاربران SUPERADMIN از نمایش
  const filteredUsers = users.filter((user) => user.role !== "SUPERADMIN");

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-md animate-fadeIn">
        <thead>
          <tr>
            <th className="p-4 text-right bg-primary text-white font-bold">
              ایمیل
            </th>
            <th className="p-4 text-right bg-primary text-white font-bold">
              نقش فعلی
            </th>
            <th className="p-4 text-right bg-primary text-white font-bold">
              تاریخ عضویت
            </th>
            <th className="p-4 text-right bg-primary text-white font-bold">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="p-4 text-right border-b border-gray-100">
                {user.email}
              </td>
              <td className="p-4 text-right border-b border-gray-100">
                {user.role}
              </td>
              <td className="p-4 text-right border-b border-gray-100">
                {new Date(user.createdAt).toLocaleDateString("fa-IR")}
              </td>
              <td className="p-4 text-right border-b border-gray-100 flex gap-2">
                {user.role === "ADMIN" ? (
                  <button
                    onClick={() => onRoleChange(user.email, "USER")}
                    className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    <FiUserMinus />
                    حذف دسترسی ادمین
                  </button>
                ) : (
                  <button
                    onClick={() => onRoleChange(user.email, "ADMIN")}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                  >
                    <FiUserPlus />
                    اعطای دسترسی ادمین
                  </button>
                )}
                <button
                  onClick={() => handleLoginAs(user.email)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                  <FiLogIn />
                  ورود به عنوان کاربر
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
