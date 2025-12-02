// src/module/AdminVisitScheduler.jsx
"use client";

import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import toast from "react-hot-toast";

const timeSlotsOptions = [
  "۹ تا ۱۲ صبح",
  "۱۲ تا ۳ بعدازظهر",
  "۳ تا ۶ عصر",
  "۶ تا ۸ شب",
];

export default function AdminVisitScheduler({
  listingId,
  currentAvailability = [],
}) {
  const [date, setDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!date || selectedTimes.length === 0) {
      toast.error("تاریخ و حداقل یک ساعت انتخاب کنید");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/visit-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId,
          date: date.toDate().toISOString().split("T")[0],
          timeSlots: selectedTimes,
        }),
      });

      if (res.ok) {
        toast.success("زمان با موفقیت اضافه شد");
        setDate(null);
        setSelectedTimes([]);
        window.location.reload();
      } else {
        toast.error("خطا در ذخیره");
      }
    } catch {
      toast.error("خطای شبکه");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (dateToRemove) => {
    if (!confirm("این زمان حذف شود؟")) return;

    await fetch("/api/visit-schedule", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId, date: dateToRemove }),
    });
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-white">
        تنظیم زمان بازدید
      </h3>

      <DatePicker
        value={date}
        onChange={setDate}
        calendar={persian}
        locale={persian_fa}
        minDate={new Date()}
        placeholder="تاریخ را انتخاب کنید"
        inputClass="w-full px-5 py-4 bg-white/20 text-white placeholder-white/70 rounded-2xl text-center"
      />

      <div className="space-y-3">
        <p className="text-white text-sm font-medium">ساعت‌های موجود:</p>
        <div className="grid grid-cols-2 gap-3">
          {timeSlotsOptions.map((slot) => (
            <label
              key={slot}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTimes.includes(slot)}
                onChange={(e) =>
                  e.target.checked
                    ? setSelectedTimes([...selectedTimes, slot])
                    : setSelectedTimes(selectedTimes.filter((t) => t !== slot))
                }
                className="w-5 h-5 rounded text-purple-600"
              />
              <span className="text-white text-sm">{slot}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={loading}
        className="w-full bg-white text-purple-700 py-4 rounded-2xl font-bold hover:bg-gray-100 transition"
      >
        {loading ? "در حال افزودن..." : "افزودن زمان"}
      </button>

      {currentAvailability.length > 0 && (
        <div className="bg-white/10 rounded-2xl p-5">
          <p className="text-white font-bold mb-3 text-sm">
            زمان‌های تنظیم‌شده:
          </p>
          {currentAvailability.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b border-white/20 last:border-0"
            >
              <span className="text-white text-sm">
                {new Date(item.date).toLocaleDateString("fa-IR")} →{" "}
                {item.timeSlots.join("، ")}
              </span>
              <button
                onClick={() => handleRemove(item.date)}
                className="text-red-400 hover:text-red-300 text-xs"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
