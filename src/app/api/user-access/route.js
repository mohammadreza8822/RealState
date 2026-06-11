import { NextResponse } from "next/server";
import {
  getUsersExcludingSuperadmin,
  findUserByEmail,
  updateUserByEmail,
} from "@/lib/repository";

export async function GET() {
  try {
    const users = await getUsersExcludingSuperadmin();
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "FETCH_USERS_ERROR" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { email, role } = body;

    if (!email || !role) {
      return NextResponse.json({ error: "INCOMPLETE_DATA" }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
    }

    if (user.role === "SUPERADMIN") {
      return NextResponse.json({ error: "CANNOT_CHANGE_SUPERADMIN" }, { status: 403 });
    }

    await updateUserByEmail(email, { role });

    return NextResponse.json({ message: "ROLE_UPDATED" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "UPDATE_ROLE_ERROR" }, { status: 500 });
  }
}
