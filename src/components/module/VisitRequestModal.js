// src/module/VisitRequestModal.jsx
"use client";

import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import DateObject from "react-date-object";
import {
  BiCalendarCheck,
  BiUser,
  BiPhone,
  BiEnvelope,
  BiTime,
} from "react-icons/bi";
import toast from "react-hot-toast";
import { useTranslations, useLocale } from "next-intl";
import { isRTLLocale } from "@/utils/locale";
import { formatTimeSlot } from "@/constants/timeSlots";
import { translateApiCode } from "@/utils/apiMessages";

export default function VisitRequestModal({
  isOpen,
  onClose,
  listingId,
  listingTitle,
  location,
  visitAvailability = [],
}) {
  const t = useTranslations("visitRequestModal");
  const tAll = useTranslations();
  const locale = useLocale();
  const isRTL = isRTLLocale(locale);

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

  const calendar = isRTL ? persian : gregorian;
  const calendarLocale = isRTL ? persian_fa : gregorian_en;
  const iconSide = isRTL ? "right-4" : "left-4";
  const inputPadding = isRTL ? "pr-12 pl-5" : "pl-12 pr-5";

  const allowedDates = visitAvailability.map((item) =>
    new DateObject(new Date(item.date)).convert(calendar)
  );

  const isValidPhone = (phone) => {
    if (isRTL) {
      return /^\d{11}$/.test(phone) && phone.startsWith("09");
    }
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 11;
  };

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

    if (!form.name || !form.phone || !form.preferredDate || !form.preferredTime) {
      toast.error(t("fillRequired"));
      return;
    }

    if (!isValidPhone(form.phone)) {
      toast.error(t("invalidPhone"));
      return;
    }

    setLoading(true);

    try {
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
          preferredDate: dateString,
          preferredTime: form.preferredTime,
          message: form.message.trim() || "",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(t("success"));
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
        toast.error(
          translateApiCode(tAll, data.code) || t("submitError")
        );
      }
    } catch (err) {
      console.error("Visit request error:", err);
      toast.error(t("networkError"));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {t("noScheduleTitle")}
          </h3>
          <p className="text-gray-600 mb-8">{t("noScheduleDesc")}</p>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-bold hover:bg-gray-300 transition"
          >
            {t("close")}
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
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white sticky top-0 z-10">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <BiCalendarCheck className="text-4xl" />
              </div>
              <div className="text-start">
                <h2 className="text-2xl md:text-3xl font-bold">{t("title")}</h2>
                <p className="text-white/90">{t("subtitle")}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-4xl hover:scale-110 transition shrink-0"
              aria-label={t("close")}
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
            <div className="relative">
              <BiUser className={`absolute ${iconSide} top-1/2 -translate-y-1/2 text-emerald-600 text-xl`} />
              <input
                type="text"
                placeholder={t("namePlaceholder")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className={`w-full ${inputPadding} py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 outline-none`}
              />
            </div>

            <div className="relative">
              <BiPhone className={`absolute ${iconSide} top-1/2 -translate-y-1/2 text-emerald-600 text-xl`} />
              <input
                type="tel"
                placeholder={t("phonePlaceholder")}
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/[^0-9+]/g, ""),
                  })
                }
                required
                className={`w-full ${inputPadding} py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 outline-none`}
                dir="ltr"
              />
            </div>

            <div className="relative">
              <BiEnvelope className={`absolute ${iconSide} top-1/2 -translate-y-1/2 text-emerald-600 text-xl`} />
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full ${inputPadding} py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 outline-none`}
                dir="ltr"
              />
            </div>

            <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <BiCalendarCheck className="text-2xl text-emerald-700" />
                <label className="text-xl font-bold text-emerald-800">
                  {t("visitDate")}
                </label>
              </div>

              <DatePicker
                value={form.preferredDate}
                onChange={handleDateChange}
                calendar={calendar}
                locale={calendarLocale}
                minDate={new Date()}
                containerClassName="w-full"
                inputClass="w-full px-6 py-5 bg-white border-2 border-emerald-300 rounded-2xl text-center text-lg font-medium cursor-pointer focus:border-emerald-600 outline-none transition-all"
                mobileMode="popup"
                weekStartDayIndex={isRTL ? 6 : 0}
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
                placeholder={t("dateHint")}
              />

              <p className="text-sm text-emerald-700 mt-3 text-center font-medium">
                {t("dateHint")}
              </p>
            </div>

            {form.preferredDate && availableTimes.length > 0 ? (
              <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <BiTime className="text-2xl text-emerald-700" />
                  <label className="text-xl font-bold text-emerald-800">
                    {t("visitTime")}
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
                  <option value="">{t("selectTimeSlot")}</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {formatTimeSlot(time, tAll)}
                    </option>
                  ))}
                </select>
              </div>
            ) : form.preferredDate ? (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 p-5 rounded-2xl text-center">
                {t("noTimeForDate")}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading || !form.preferredTime}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? t("submitting") : t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
