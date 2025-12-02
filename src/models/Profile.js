// models/Profile.js
import { Schema, model, models } from "mongoose";

const profileSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    realState: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    constructionDate: { type: Date, required: true },
    category: {
      type: String,
      enum: ["villa", "apartment", "store", "office"],
      required: true,
    },
    amenities: { type: [String], default: [] },
    rules: { type: [String], default: [] },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    published: { type: Boolean, default: false },

    // جدید: زمان‌های مجاز برای بازدید حضوری (فقط ادمین تنظیم می‌کنه)
    visitAvailability: [
      {
        date: { type: Date, required: true }, // مثلاً 2025-12-20
        timeSlots: {
          type: [String],
          enum: ["۹ تا ۱۲ صبح", "۱۲ تا ۳ بعدازظهر", "۳ تا ۶ عصر", "۶ تا ۸ شب"],
          default: [],
        },
      },
    ],
  },
  { timestamps: true }
);

const Profile = models.Profile || model("Profile", profileSchema);
export default Profile;
