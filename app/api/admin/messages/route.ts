import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getMessages } from "@/lib/message-store";

export async function GET(request: NextRequest) {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const messages = await getMessages();
    return NextResponse.json(messages);
}
