// models/VisitRequest.js
import mongoose from "mongoose";

const VisitRequestSchema = new mongoose.Schema(
  {
    // اطلاعات آگهی
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing", // یا هر نامی که مدل آگهی‌هات داره (Ad, Property, ...)
      required: true,
    },
    listingTitle: { type: String, required: true },
    location: { type: String, required: true },

    // اطلاعات کاربر
    userName: { type: String, required: true, trim: true },
    userPhone: { type: String, required: true, trim: true },
    userEmail: { type: String, trim: true, default: null }, // اختیاری

    // زمان بازدید
    preferredDate: { type: Date, required: true }, // مثلاً "2025-12-15" → به Date تبدیل میشه
    preferredTime: {
      type: String,
      enum: ["", "۹ تا ۱۲ صبح", "۱۲ تا ۳ بعدازظهر", "۳ تا ۶ عصر", "۶ تا ۸ شب"],
      default: "",
    },

    // پیام اضافی
    message: { type: String, default: "" },

    // وضعیت و مدیریت

    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "completed", "canceled"],
      default: "pending",
    },
    notified: { type: Boolean, default: false }, // برای پیامک یا ایمیل به مشاور
    adminSeen: { type: Boolean, default: false }, // برای علامت "خوانده نشده" در داشبورد
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ایندکس برای سرعت بالا
VisitRequestSchema.index({ listingId: 1 });
VisitRequestSchema.index({ createdAt: -1 });
VisitRequestSchema.index({ status: 1 });

// تبدیل خودکار تاریخ شمسی (در صورت نیاز)
VisitRequestSchema.virtual("persianDate").get(function () {
  if (!this.preferredDate) return null;
  return new Date(this.preferredDate).toLocaleDateString("fa-IR");
});

export default mongoose.models.VisitRequest ||
  mongoose.model("VisitRequest", VisitRequestSchema);
