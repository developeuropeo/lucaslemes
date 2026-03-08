import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { markAsRead, deleteMessage } from "@/lib/message-store";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const { id } = await params;
    await markAsRead(id);
    return NextResponse.json({ success: true });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const { id } = await params;
    await deleteMessage(id);
    return NextResponse.json({ success: true });
}
