// app/api/profile/route.js

import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import {
  getPublishedProfiles,
  findUserByEmail,
  createProfile,
  updateProfile,
  getProfileById,
} from "@/lib/repository";

const uploadDir = path.join(process.cwd(), "public/uploads");

// مطمئن شو که پوشه uploads وجود داره
await mkdir(uploadDir, { recursive: true });

export async function GET() {
  try {
    const profiles = await getPublishedProfiles();
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
    const formData = await req.formData();
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری شوید" },
        { status: 401 }
      );
    }

    const user = await findUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    const title = formData.get("title");
    const description = formData.get("description");
    const location = formData.get("location");
    const phone = formData.get("phone");
    const realState = formData.get("realState");
    const price = formData.get("price");
    const size = formData.get("size");
    const category = formData.get("category");
    const constructionDate = formData.get("constructionDate");

    const amenities = [];
    const rules = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("amenities[")) amenities.push(value);
      if (key.startsWith("rules[")) rules.push(value);
    }

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

    await createProfile({
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
      image: images[0] || null,
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
    const formData = await req.formData();
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری شوید" },
        { status: 401 }
      );
    }

    const user = await findUserByEmail(session.user.email);
    if (!user)
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });

    const _id = formData.get("_id");
    if (!_id)
      return NextResponse.json(
        { error: "شناسه آگهی یافت نشد" },
        { status: 400 }
      );

    const profile = await getProfileById(_id);
    if (!profile)
      return NextResponse.json({ error: "آگهی یافت نشد" }, { status: 404 });
    if (String(profile.userId) !== String(user._id)) {
      return NextResponse.json({ error: "دسترسی محدود" }, { status: 403 });
    }

    const amenities = [];
    const rules = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("amenities[")) amenities.push(value);
      if (key.startsWith("rules[")) rules.push(value);
    }

    const existingImages = formData.getAll("existingImages");
    const newFiles = formData.getAll("images");

    for (const file of newFiles) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
        await writeFile(path.join(uploadDir, filename), buffer);
        existingImages.push(`/uploads/${filename}`);
      }
    }

    await updateProfile(_id, {
      title: formData.get("title"),
      description: formData.get("description"),
      location: formData.get("location"),
      phone: formData.get("phone"),
      realState: formData.get("realState"),
      price: Number(formData.get("price")),
      size: Number(formData.get("size")),
      category: formData.get("category"),
      constructionDate: new Date(formData.get("constructionDate")),
      amenities,
      rules,
      image: existingImages[0] || profile.image,
    });

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
