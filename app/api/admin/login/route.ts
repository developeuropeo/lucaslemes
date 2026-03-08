import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, signToken, setTokenCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
    const { username, password } = await request.json();

    if (!verifyCredentials(username, password)) {
        return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const token = await signToken({ username, role: "admin" });
    const cookie = setTokenCookie(token);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof res.cookies.set>[2]);
    return res;
}
