import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import fs from "fs";
import path from "path";

// Max 50 MB
const MAX_SIZE = 50 * 1024 * 1024;

export async function POST(request: NextRequest) {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || !file.name) {
        return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
        return NextResponse.json({ error: "Arquivo muito grande (máx. 50 MB)" }, { status: 413 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
    const slug = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(uploadDir, slug), buffer);

    return NextResponse.json({ url: `/uploads/${slug}` });
}
