// app/api/profile/route.js

import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Profile from "@/models/Profile";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";

const uploadDir = path.join(process.cwd(), "public/uploads");

// مطمئن شو که پوشه uploads وجود داره
await mkdir(uploadDir, { recursive: true });

// اضافه کن بالای POST و PATCH
export async function GET() {
  try {
    await connectDB();

    const profiles = await Profile.find({ published: true })
      .select("-userId -__v")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ data: profiles }, { status: 200 });
  } catch (err) {
    console.error("خطا در GET /api/profile:", err);
    return NextResponse.json(
      { error: "خطایی در سرور رخ داد" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری شوید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    // دریافت داده‌های متنی
    const title = formData.get("title");
    const description = formData.get("description");
    const location = formData.get("location");
    const phone = formData.get("phone");
    const realState = formData.get("realState");
    const price = formData.get("price");
    const size = formData.get("size");
    const category = formData.get("category");
    const constructionDate = formData.get("constructionDate");

    // دریافت آرایه‌ها (amenities و rules)
    const amenities = [];
    const rules = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("amenities[")) amenities.push(value);
      if (key.startsWith("rules[")) rules.push(value);
    }

    // اعتبارسنجی
    if (
      !title ||
      !description ||
      !location ||
      !phone ||
      !realState ||
      !price ||
      !size ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا همه فیلدها را پر کنید" },
        { status: 400 }
      );
    }

    // آپلود عکس‌ها
    const images = [];
    const files = formData.getAll("images");

    for (const file of files) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);
        images.push(`/uploads/${filename}`);
      }
    }

    // ایجاد آگهی جدید
    await Profile.create({
      title,
      description,
      location,
      phone,
      realState,
      price: Number(price),
      size: Number(size),
      constructionDate: new Date(constructionDate),
      category,
      amenities,
      rules,
      images, // آرایه از مسیر عکس‌ها
      userId: user._id,
      published: true,
    });

    return NextResponse.json(
      { message: "آگهی با موفقیت ثبت شد" },
      { status: 201 }
    );
  } catch (err) {
    console.error("خطا در POST /api/profile:", err);
    return NextResponse.json(
      { error: "خطایی در سرور رخ داد" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری شوید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user)
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });

    // دریافت _id از فرم (مثلاً از یک input مخفی یا از URL)
    const _id = formData.get("_id");
    if (!_id)
      return NextResponse.json(
        { error: "شناسه آگهی یافت نشد" },
        { status: 400 }
      );

    const profile = await Profile.findOne({ _id });
    if (!profile)
      return NextResponse.json({ error: "آگهی یافت نشد" }, { status: 404 });
    if (!profile.userId.equals(user._id)) {
      return NextResponse.json({ error: "دسترسی محدود" }, { status: 403 });
    }

    // بروزرسانی فیلدها
    profile.title = formData.get("title");
    profile.description = formData.get("description");
    profile.location = formData.get("location");
    profile.phone = formData.get("phone");
    profile.realState = formData.get("realState");
    profile.price = Number(formData.get("price"));
    profile.size = Number(formData.get("size"));
    profile.category = formData.get("category");
    profile.constructionDate = new Date(formData.get("constructionDate"));

    // بروزرسانی امکانات و قوانین
    profile.amenities = [];
    profile.rules = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("amenities[")) profile.amenities.push(value);
      if (key.startsWith("rules[")) profile.rules.push(value);
    }

    // مدیریت عکس‌ها
    const existingImages = formData.getAll("existingImages");
    const newFiles = formData.getAll("images");

    // عکس‌های جدید رو اضافه کن
    for (const file of newFiles) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
        await writeFile(path.join(uploadDir, filename), buffer);
        existingImages.push(`/uploads/${filename}`);
      }
    }

    profile.images = existingImages; // فقط عکس‌هایی که کاربر نگه داشته + جدیدها

    await profile.save();

    return NextResponse.json(
      { message: "آگهی با موفقیت‌آمیز ویرایش شد" },
      { status: 200 }
    );
  } catch (err) {
    console.error("خطا در PATCH /api/profile:", err);
    return NextResponse.json(
      { error: "خطایی در سرور رخ داد" },
      { status: 500 }
    );
  }
}
