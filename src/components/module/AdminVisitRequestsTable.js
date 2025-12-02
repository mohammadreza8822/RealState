// src/components/AdminVisitRequestsTable.jsx
"use client";
import { useState } from "react";
import PersianDate from "@/module/PersianDate";
import toast from "react-hot-toast";

// تابع‌های کمکی برای وضعیت - کاملاً آبی!
const getStatusText = (status) => {
  const map = {
    pending: "در انتظار",
    confirmed: "تأیید شده",
    rejected: "رد شده",
    completed: "انجام شد",
    canceled: "لغو شد",
  };
  return map[status] || "نامشخص";
};

const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-blue-100 text-blue-800 ring-blue-200";
    case "rejected":
      return "bg-red-100 text-red-800 ring-red-200";
    case "pending":
    default:
      return "bg-cyan-100 text-cyan-800 ring-cyan-200";
  }
};

export default function AdminVisitRequestsTable({ initialRequests }) {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isUpdating, setIsUpdating] = useState(null);

  const filtered = requests.filter((req) => {
    const matchesSearch =
      req.userName.toLowerCase().includes(search.toLowerCase()) ||
      req.userPhone.includes(search) ||
      req.listingTitle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const copyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    toast.success("شماره کپی شد!");
  };

  const updateStatus = async (id, newStatus) => {
    setIsUpdating(id);
    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
    );

    try {
      const res = await fetch("/api/visit-request/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id, status: newStatus }),
      });
      if (!res.ok) throw new Error();
      toast.success("وضعیت با موفقیت بروز شد");
    } catch (err) {
      toast.error("خطا در بروزرسانی وضعیت");
      // برگرداندن وضعیت قبلی
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: req.status } : r))
      );
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* جستجو و فیلتر */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          dir="rtl"
          placeholder="جستجو در نام، شماره یا آگهی..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-4 text-right border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition bg-white shadow-sm"
        />
        <select
          dir="rtl"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full px-5 py-4 text-right border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none bg-white shadow-sm"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundPosition: "left 1rem center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "16px",
            paddingLeft: "3rem",
          }}
        >
          <option value="all">همه وضعیت‌ها</option>
          <option value="pending">در انتظار</option>
          <option value="confirmed">تأیید شده</option>
          <option value="rejected">رد شده</option>
        </select>
      </div>

      {/* جدول با تم آبی خفن */}
      <div className="overflow-x-auto rounded-2xl shadow-2xl border border-blue-100">
        <table className="w-full min-w-[900px] table-auto">
          {/* هدر با گرادیان آبی فوق‌العاده */}
          <thead className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-lg">
            <tr>
              <th className="px-6 py-5 text-right text-sm md:text-base font-semibold">
                آگهی
              </th>
              <th className="px-6 py-5 text-right text-sm md:text-base font-semibold">
                درخواست‌دهنده
              </th>
              <th className="px-6 py-5 text-right text-sm md:text-base font-semibold">
                تاریخ و ساعت
              </th>
              <th className="px-6 py-5 text-right text-sm md:text-base font-semibold">
                وضعیت
              </th>
              <th className="px-6 py-5 text-right text-sm md:text-base font-semibold">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-50">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-20 text-gray-400 text-lg"
                >
                  هیچ درخواستی یافت نشد
                </td>
              </tr>
            ) : (
              filtered.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-blue-50/70 transition-all duration-300"
                >
                  {/* آگهی */}
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={req.listingImage || "/placeholder-home.jpg"}
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover shadow-lg ring-2 ring-blue-100"
                      />
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {req.listingTitle}
                        </p>
                        <p className="text-sm text-blue-600">{req.location}</p>
                      </div>
                    </div>
                  </td>

                  {/* درخواست‌دهنده */}
                  <td className="px-6 py-6 text-center">
                    <p className="font-bold text-gray-900">{req.userName}</p>
                    <p className="text-sm text-blue-700 font-mono mt-1">
                      {req.userPhone}
                    </p>
                  </td>

                  {/* تاریخ و ساعت */}
                  <td className="px-6 py-6 text-center">
                    <p className="font-bold text-blue-600">
                      <PersianDate date={req.preferredDate} />
                    </p>
                    <p className="text-cyan-600 text-sm font-medium mt-1">
                      {req.preferredTime || "نامشخص"}
                    </p>
                  </td>

                  {/* وضعیت - کاملاً آبی */}
                  <td className="px-6 py-6 text-center">
                    <span
                      className={`inline-flex items-center px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap ring-2 ring-inset shadow-md ${getStatusColor(
                        req.status
                      )}`}
                    >
                      {getStatusText(req.status)}
                    </span>
                  </td>

                  {/* عملیات */}
                  <td className="px-6 py-6">
                    <div className="flex justify-center gap-3">
                      <a
                        href={`tel:${req.userPhone}`}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all shadow-lg text-sm font-bold"
                      >
                        تماس
                      </a>
                      <button
                        onClick={() => copyPhone(req.userPhone)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-6 py-3 rounded-xl transition-all shadow-md text-sm font-bold border border-blue-200"
                      >
                        کپی شماره
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-center text-sm text-blue-500 mt-6 block md:hidden font-medium">
        ← برای دیدن همه ستون‌ها، به چپ بکشید →
      </p>
    </div>
  );
}
