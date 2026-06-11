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
      return NextResponse.json({ error: "NOT_LOGGED_IN" }, { status: 401 });
    }

    const user = await findUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
    }

    const profile = await getProfileById(id);
    if (!profile) {
      return NextResponse.json({ error: "PROFILE_NOT_FOUND" }, { status: 404 });
    }
    if (String(profile.userId) !== String(user._id)) {
      return NextResponse.json({ error: "ACCESS_DENIED" }, { status: 403 });
    }

    await deleteProfile(id);

    return NextResponse.json({ message: "PROFILE_DELETED" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
