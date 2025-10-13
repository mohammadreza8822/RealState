import styles from "./UsersTable.module.css";
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
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ایمیل</th>
            <th>نقش فعلی</th>
            <th>تاریخ عضویت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString("fa-IR")}</td>
              <td className={styles.actions}>
                {user.role === "ADMIN" ? (
                  <button
                    onClick={() => onRoleChange(user.email, "USER")}
                    className={styles.removeButton}
                  >
                    <FiUserMinus />
                    حذف دسترسی ادمین
                  </button>
                ) : (
                  <button
                    onClick={() => onRoleChange(user.email, "ADMIN")}
                    className={styles.addButton}
                  >
                    <FiUserPlus />
                    اعطای دسترسی ادمین
                  </button>
                )}
                <button
                  onClick={() => handleLoginAs(user.email)}
                  className={styles.loginButton}
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
