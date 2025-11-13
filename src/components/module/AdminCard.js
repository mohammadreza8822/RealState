"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { sp } from "@/utils/replaceNumber";

function AdminCard({ data: { title, location, description, price, _id } }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteHandler = async () => {
    setLoading(true);
    const res = await fetch(`/api/profile/published/${_id}`, {
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
    <div className="border-b-2 border-primary pb-3 mb-20 animate-fadeIn">
      <h3 className="text-xl text-primary mb-5">{title}</h3>
      <p className="text-justify text-gray-700 mb-5 leading-7">{description}</p>
      <div className="flex mb-5">
        <span className="bg-primary/20 text-primary px-3 py-1.5 ml-4 rounded-md">
          {location}
        </span>
        <span className="bg-primary/20 text-primary px-3 py-1.5 rounded-md">
          {sp(price)} تومان
        </span>
      </div>
      <div className="flex gap-3 mt-5">
        <button
          onClick={publishHandler}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          انتشار
        </button>
        <Link href={`/buy-residential/${_id}`}>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-all duration-200">
            مشاهده جزئیات
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AdminCard;
