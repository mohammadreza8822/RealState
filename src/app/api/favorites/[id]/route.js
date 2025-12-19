import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Profile from "@/models/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function POST(req, { params }) {
  try {
    // Connect to database first
    try {
      await connectDB();
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return new Response(JSON.stringify({ error: "خطا در اتصال به دیتابیس" }), {
        status: 500,
      });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "لطفاً وارد شوید" }), {
        status: 401,
      });
    }

    // Unwrap params Promise (Next.js 15/16)
    const { id } = await params;
    
    if (!id) {
      return new Response(JSON.stringify({ error: "شناسه آگهی ارسال نشده است" }), {
        status: 400,
      });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return new Response(JSON.stringify({ error: "کاربر یافت نشد" }), {
        status: 404,
      });
    }

    // این خط حیاتیه — اگه favorites وجود نداشته باشه، یه آرایه خالی بساز
    if (!user.favorites || !Array.isArray(user.favorites)) {
      user.favorites = [];
    }

    // Convert id to ObjectId for proper comparison
    let adObjectId;
    try {
      adObjectId = new mongoose.Types.ObjectId(id);
    } catch (err) {
      console.error("Invalid ObjectId format:", id, err);
      return new Response(JSON.stringify({ error: "شناسه آگهی نامعتبر است" }), {
        status: 400,
      });
    }

    // Check if the ad is already in favorites using ObjectId comparison
    const existingIndex = user.favorites.findIndex(fav => {
      const favId = fav?.toString?.() || String(fav);
      const targetId = adObjectId?.toString?.() || String(adObjectId);
      return favId === targetId;
    });

    if (existingIndex === -1) {
      // Add to favorites - use ObjectId
      user.favorites.push(adObjectId);
    } else {
      // Remove from favorites
      user.favorites.splice(existingIndex, 1);
    }

    // Mark favorites as modified to ensure save
    user.markModified('favorites');
    
    try {
      await user.save();
    } catch (saveError) {
      console.error("Error saving user:", saveError);
      return new Response(JSON.stringify({ error: "خطا در ذخیره اطلاعات", details: saveError.message }), {
        status: 500,
      });
    }

    const isNowFavorite = existingIndex === -1;

    return new Response(
      JSON.stringify({
        message:
          isNowFavorite
            ? "به علاقه‌مندی‌ها اضافه شد"
            : "از علاقه‌مندی‌ها حذف شد",
        isFavorite: isNowFavorite,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("خطا در favorites API:", err);
    try {
      const { id } = await params;
      console.error("Error details:", {
        message: err.message,
        stack: err.stack,
        id: id
      });
    } catch (paramError) {
      console.error("Error details:", {
        message: err.message,
        stack: err.stack,
        id: "unknown"
      });
    }
    return new Response(JSON.stringify({ error: "خطا در سرور", details: err.message }), {
      status: 500,
    });
  }
}
