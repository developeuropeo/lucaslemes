import { NextRequest, NextResponse } from "next/server";
import { getItemById, updateItem, deleteItem } from "@/lib/portfolio-store";
import { getAdminSession } from "@/lib/auth";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = getItemById(id);
    if (!item) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const item = updateItem(id, body);
    if (!item) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    return NextResponse.json(item);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const { id } = await params;
    const deleted = deleteItem(id);
    if (!deleted) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    return NextResponse.json({ ok: true });
}
