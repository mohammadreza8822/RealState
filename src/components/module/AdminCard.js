"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "@/module/AdminCard.module.css";
import { sp } from "@/utils/replaceNumber";

function AdminCard({ data: { title, location, description, price, _id } }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteHandler = async () => {
    setLoading(true);
    const res = await fetch(`/api/profile/delete/${_id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
      router.refresh();
      setLoading(false);
    }
  };

  const publishHandler = async () => {
    const res = await fetch(`/api/profile/published/${_id}`, {
      method: "PATCH",
    });
    const result = await res.json();
    if (result.message) {
      toast.success(result.message);
      router.refresh();
    }
  };

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.properties}>
        <span>{location}</span>
        <span>{sp(price)}</span>
      </div>
      <button onClick={publishHandler}>انتشار</button>
      <Link href={`/buy-residential/${_id}`}>
        <button style={{ backgroundColor: "blue", marginRight: "10px" }}>
          مشاهده جزئیات
        </button>
      </Link>
      <button
        style={{ backgroundColor: "red", marginRight: "10px" }}
        onClick={deleteHandler}
      >
        حذف آگهی
      </button>
      <Toaster />
    </div>
  );
}

export default AdminCard;
