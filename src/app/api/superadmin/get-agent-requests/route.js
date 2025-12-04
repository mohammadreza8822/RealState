// app/api/superadmin/get-agent-requests/route.js

import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const [pending, approved, rejected] = await Promise.all([
      User.find({ agentStatus: "pending" })
        .select("email agentRequestedAt createdAt")
        .lean(),
      User.find({ agentStatus: "approved" })
        .select("email agentApprovedAt")
        .lean(),
      User.find({ agentStatus: "rejected" })
        .select("email agentRequestedAt")
        .lean(),
    ]);

    return NextResponse.json({ pending, approved, rejected });
  } catch (error) {
    return NextResponse.json({ pending: [], approved: [], rejected: [] });
  }
}
