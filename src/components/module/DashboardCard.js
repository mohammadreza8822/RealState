"use client";

import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
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
    <div className="flex border-2 border-primary/30 rounded-2xl mb-5 hover:shadow-md transition-all duration-200">
      <Card data={data} />
      <div className="flex items-end justify-between p-3 w-full">
        <button
          onClick={editHandler}
          className="flex justify-center items-center w-[48%] bg-white border border-green-600 text-green-600 h-10 rounded-lg text-base hover:bg-green-600 hover:text-white transition-all duration-200"
        >
          ویرایش <FiEdit className="mr-2 text-lg" />
        </button>
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={deleteHandler}
            className="flex justify-center items-center w-[48%] bg-white border border-red-600 text-red-600 h-10 rounded-lg text-base hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            حذف آگهی
            <AiOutlineDelete className="mr-2 text-lg" />
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default DashboardCard;
