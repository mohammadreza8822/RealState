import styles from "./UsersTable.module.css";
import { FiUserPlus, FiUserMinus } from "react-icons/fi";

function UsersTable({ users, onRoleChange }) {
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
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString("fa-IR")}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
