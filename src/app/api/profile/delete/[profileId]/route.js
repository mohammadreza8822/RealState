import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {
  findUserByEmail,
  getProfileById,
  deleteProfile,
} from "@/lib/repository";

export async function DELETE(req, context) {
  try {
    const { profileId: id } = await context.params;

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید." },
        { status: 401 }
      );
    }

    const user = await findUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری شما یافت نشد!" },
        { status: 404 }
      );
    }

    const profile = await getProfileById(id);
    if (!profile) {
      return NextResponse.json({ error: "آگهی یافت نشد" }, { status: 404 });
    }
    if (String(profile.userId) !== String(user._id)) {
      return NextResponse.json(
        { error: "دسترسی شما به آگهی محدود شده است" },
        { status: 403 }
      );
    }

    await deleteProfile(id);

    return NextResponse.json(
      { message: "آگهی مورد نظر حذف شد" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
