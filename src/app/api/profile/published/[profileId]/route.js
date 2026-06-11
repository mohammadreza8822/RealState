import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {
  findUserByEmail,
  publishProfile,
  deleteProfile,
  getProfileById,
} from "@/lib/repository";

export async function PATCH(req, context) {
  try {
    const { profileId: id } = await context.params;

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json({ error: "NOT_LOGGED_IN" }, { status: 401 });
    }

    const user = await findUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
    }
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "ACCESS_DENIED" }, { status: 403 });
    }

    const profile = await getProfileById(id);
    if (!profile) {
      return NextResponse.json({ error: "PROFILE_NOT_FOUND" }, { status: 404 });
    }

    await publishProfile(id);

    return NextResponse.json({ message: "PROFILE_PUBLISHED" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { profileId: id } = await context.params;

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json({ error: "NOT_LOGGED_IN" }, { status: 401 });
    }

    const user = await findUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
    }

    await deleteProfile(id);

    return NextResponse.json({ message: "PROFILE_DELETED" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
