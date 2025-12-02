// src/module/VisitRequestModal.jsx
"use client";

// import DateObject from "react-date-object";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import {
  BiCalendarCheck,
  BiUser,
  BiPhone,
  BiEnvelope,
  BiTime,
} from "react-icons/bi";
import toast from "react-hot-toast";

export default function VisitRequestModal({
  isOpen,
  onClose,
  listingId,
  listingTitle,
  location,
  visitAvailability = [],
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: null,
    preferredTime: "",
    message: "",
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  // تبدیل تاریخ‌های مجاز به فرمت DateObject برای react-multi-date-picker
  const allowedDates = visitAvailability.map((item) =>
    new DateObject(new Date(item.date)).set("calendar", persian)
  );

  // وقتی کاربر تاریخ رو انتخاب کرد
  const handleDateChange = (date) => {
    if (!date) {
      setForm({ ...form, preferredDate: null, preferredTime: "" });
      setAvailableTimes([]);
      return;
    }

    setForm({ ...form, preferredDate: date, preferredTime: "" });

    const selectedDateStr = date.toDate().toISOString().split("T")[0];
    const selected = visitAvailability.find(
      (item) =>
        new Date(item.date).toISOString().split("T")[0] === selectedDateStr
    );

    setAvailableTimes(selected ? selected.timeSlots : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی
    if (
      !form.name ||
      !form.phone ||
      !form.preferredDate ||
      !form.preferredTime
    ) {
      toast.error("لطفاً همه فیلدهای الزامی را پر کنید");
      return;
    }

    if (!/^\d{11}$/.test(form.phone) || !form.phone.startsWith("09")) {
      toast.error("شماره تلفن باید ۱۱ رقمی و با ۰۹ شروع شود");
      return;
    }

    setLoading(true);

    try {
      // درست کردن تاریخ — مهم‌ترین خط!
      const dateString = form.preferredDate
        .toDate()
        .toISOString()
        .split("T")[0];

      const res = await fetch("/api/visit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId,
          listingTitle,
          location,
          name: form.name.trim(),
          phone: form.phone,
          email: form.email.trim() || "",
          preferredDate: dateString, // ← درست و تضمینی
          preferredTime: form.preferredTime,
          message: form.message.trim() || "",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          "درخواست بازدید با موفقیت ثبت شد! مشاور ظرف ۲۴ ساعت تماس می‌گیرد"
        );
        onClose();
        setForm({
          name: "",
          phone: "",
          email: "",
          preferredDate: null,
          preferredTime: "",
          message: "",
        });
        setAvailableTimes([]);
      } else {
        toast.error(data.message || "خطا در ارسال درخواست");
      }
    } catch (err) {
      console.error("خطا در ارسال درخواست بازدید:", err);
      toast.error("خطای شبکه. لطفاً دوباره تلاش کنید");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // اگر هیچ روزی تنظیم نشده
  if (visitAvailability.length === 0) {
    return (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-8xl mb-4">Calendar Off</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            زمان بازدید تعیین نشده
          </h3>
          <p className="text-gray-600 mb-8">
            مشاور هنوز روز و ساعتی برای بازدید این ملک تعیین نکرده است.
          </p>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-bold hover:bg-gray-300 transition"
          >
            بستن
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <BiCalendarCheck className="text-4xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">درخواست بازدید حضوری</h2>
                <p className="text-white/90">رایگان و بدون واسطه</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-4xl hover:scale-110 transition"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 mb-8 text-center">
            <p className="text-xl font-bold text-emerald-800">{listingTitle}</p>
            <p className="text-gray-600">{location}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* نام و تلفن و ایمیل */}
            <div className="relative">
              <BiUser className="absolute left-4 top-6 text-emerald-600 text-xl" />
              <input
                type="text"
                placeholder="نام و نام خانوادگی *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full pl-12 pr-5 py-5 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="relative">
              <BiPhone className="absolute left-4 top-6 text-emerald-600 text-xl" />
              <input
                type="text"
                placeholder="شماره تماس (۰۹۱۲۳۴۵۶۷۸۹) *"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                required
                maxLength="11"
                className="w-full pl-12 pr-5 py-5 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="relative">
              <BiEnvelope className="absolute left-4 top-6 text-emerald-600 text-xl" />
              <input
                type="email"
                placeholder="ایمیل (اختیاری)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-12 pr-5 py-5 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 outline-none"
              />
            </div>

            {/* تاریخ — فقط تاریخ‌های مجاز قابل انتخاب هستند */}
            <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <BiCalendarCheck className="text-2xl text-emerald-700" />
                <label className="text-xl font-bold text-emerald-800">
                  تاریخ بازدید *
                </label>
              </div>

              <DatePicker
                value={form.preferredDate}
                onChange={handleDateChange}
                calendar={persian}
                locale={persian_fa}
                minDate={new Date()}
                // این قسمت‌ها رو اضافه/ویرایش کن:
                containerClassName="w-full"
                inputClass="w-full px-6 py-6 bg-white border-2 border-emerald-300 rounded-2xl text-center text-lg font-medium cursor-pointer focus:border-emerald-600 outline-none transition-all"
                // این قسمت خیلی مهمه — تقویم رو بزرگ و کامل نشون میده
                // className="rmdp-mobile rmdp-prime w-full"
                // برای موبایل هم کامل باز بشه
                mobileMode="popup"
                // استایل روزهای مجاز و غیرمجاز
                mapDays={({ date }) => {
                  const isAllowed = allowedDates.some(
                    (allowed) =>
                      allowed.day === date.day &&
                      allowed.month.number === date.month.number &&
                      allowed.year === date.year
                  );

                  if (!isAllowed) {
                    return {
                      disabled: true,
                      style: { color: "#e5e7eb", cursor: "not-allowed" },
                    };
                  }

                  return {
                    style: {
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                      fontWeight: "bold",
                      borderRadius: "12px",
                      border: "2px solid #a7f3d0",
                    },
                  };
                }}
                placeholder="فقط روزهای سبز قابل انتخاب هستند"
                weekStartDayIndex={6} // شنبه اول هفته باشه
              />

              <p className="text-sm text-emerald-700 mt-3 text-center font-medium">
                فقط روزهای سبز قابل انتخاب هستند
              </p>
            </div>

            {/* ساعت — فقط ساعت‌های مجاز */}
            {form.preferredDate && availableTimes.length > 0 ? (
              <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <BiTime className="text-2xl text-emerald-700" />
                  <label className="text-xl font-bold text-emerald-800">
                    ساعت بازدید *
                  </label>
                </div>
                <select
                  value={form.preferredTime}
                  onChange={(e) =>
                    setForm({ ...form, preferredTime: e.target.value })
                  }
                  required
                  className="w-full px-6 py-5 bg-white border-2 border-emerald-300 rounded-2xl focus:border-emerald-600 outline-none cursor-pointer"
                >
                  <option value="">یک بازه زمانی انتخاب کنید</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            ) : form.preferredDate ? (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 p-5 rounded-2xl text-center">
                برای این تاریخ ساعتی تعیین نشده است
              </div>
            ) : null}

            {/* دکمه ارسال */}
            <button
              type="submit"
              disabled={loading || !form.preferredTime}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-6 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-4"
            >
              {loading ? "در حال ارسال..." : "ارسال درخواست بازدید"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
