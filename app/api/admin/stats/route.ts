import { NextResponse } from "next/server";
import { getStats } from "@/lib/portfolio-store";

export async function GET() {
    return NextResponse.json(getStats());
}
