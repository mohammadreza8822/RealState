import { getAgentRequests } from "@/lib/repository";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { pending, approved, rejected } = await getAgentRequests();
    return NextResponse.json({ pending, approved, rejected });
  } catch (error) {
    return NextResponse.json({ pending: [], approved: [], rejected: [] });
  }
}
