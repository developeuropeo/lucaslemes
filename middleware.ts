import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET ?? "dev-secret-change-in-production"
);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only run on /admin routes
    if (!pathname.startsWith("/admin")) return NextResponse.next();

    // Allow login page
    if (pathname === "/admin/login") return NextResponse.next();

    // Check token
    const token = request.cookies.get("admin_token")?.value;
    if (token) {
        try {
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch {
            // Invalid token — fall through to redirect
        }
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/admin/:path*"],
};
