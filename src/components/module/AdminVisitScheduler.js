// src/module/AdminVisitScheduler.jsx
"use client";

import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import toast from "react-hot-toast";
import { useTranslations, useLocale } from "next-intl";
import { isRTLLocale } from "@/utils/locale";
import { TIME_SLOT_KEYS, formatTimeSlot } from "@/constants/timeSlots";

export default function AdminVisitScheduler({
  listingId,
  currentAvailability = [],
}) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = isRTLLocale(locale);
  const dateLocale =
    locale === "fa" ? "fa-IR" : locale === "ar" ? "ar-SA" : "en-US";

  const [date, setDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!date || selectedTimes.length === 0) {
      toast.error(t("visitScheduler.selectDateAndTime"));
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
        toast.success(t("visitScheduler.addSuccess"));
        setDate(null);
        setSelectedTimes([]);
        window.location.reload();
      } else {
        toast.error(t("visitScheduler.saveError"));
      }
    } catch {
      toast.error(t("visitScheduler.networkError"));
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (dateToRemove) => {
    if (!confirm(t("visitScheduler.confirmDelete"))) return;

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
        {t("visitScheduler.title")}
      </h3>

      <DatePicker
        value={date}
        onChange={setDate}
        calendar={isRTL ? persian : gregorian}
        locale={isRTL ? persian_fa : gregorian_en}
        minDate={new Date()}
        placeholder={t("visitScheduler.datePlaceholder")}
        inputClass="w-full px-5 py-4 bg-white/20 text-white placeholder-white/70 rounded-2xl text-center"
      />

      <div className="space-y-3">
        <p className="text-white text-sm font-medium">
          {t("visitScheduler.availableHours")}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {TIME_SLOT_KEYS.map((slot) => (
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
                    : setSelectedTimes(selectedTimes.filter((s) => s !== slot))
                }
                className="w-5 h-5 rounded text-purple-600"
              />
              <span className="text-white text-sm">
                {t(`visitScheduler.timeSlots.${slot}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={loading}
        className="w-full bg-white text-purple-700 py-4 rounded-2xl font-bold hover:bg-gray-100 transition"
      >
        {loading ? t("visitScheduler.adding") : t("visitScheduler.addTime")}
      </button>

      {currentAvailability.length > 0 && (
        <div className="bg-white/10 rounded-2xl p-5">
          <p className="text-white font-bold mb-3 text-sm">
            {t("visitScheduler.scheduledTimes")}
          </p>
          {currentAvailability.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b border-white/20 last:border-0 gap-3"
            >
              <span className="text-white text-sm">
                {new Date(item.date).toLocaleDateString(dateLocale)} →{" "}
                {item.timeSlots.map((slot) => formatTimeSlot(slot, t)).join(", ")}
              </span>
              <button
                onClick={() => handleRemove(item.date)}
                className="text-red-400 hover:text-red-300 text-xs shrink-0"
              >
                {t("visitScheduler.delete")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
