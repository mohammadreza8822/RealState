"use client";

import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "@/module/DashboardCard.module.css";
import Card from "./Card";
import { useState } from "react";
import Loader from "./Loader";

function DashboardCard({ data }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const editHandler = () => {
    router.push(`/dashboard/my-profiles/${data._id}`);
  };

  const deleteHandler = async () => {
    setLoading(true);
    const res = await fetch(`/api/profile/delete/${data._id}`, {
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

  return (
    <div className={styles.container}>
      <Card data={data} />
      <div className={styles.main}>
        <button onClick={editHandler}>
          ویرایش <FiEdit />
        </button>
        {loading ? (
          <Loader />
        ) : (
          <button onClick={deleteHandler}>
            حذف آگهی
            <AiOutlineDelete />
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default DashboardCard;
