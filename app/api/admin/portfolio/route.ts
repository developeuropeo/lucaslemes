import { NextRequest, NextResponse } from "next/server";
import { getAllItems, createItem } from "@/lib/portfolio-store";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const items = await getAllItems();
    return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const body = await request.json();
    const item = createItem(body);
    return NextResponse.json(item, { status: 201 });
}
