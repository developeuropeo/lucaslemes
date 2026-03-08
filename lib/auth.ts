import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";
const secret = new TextEncoder().encode(
    process.env.JWT_SECRET ?? "dev-secret-change-in-production"
);

export async function signToken(payload: Record<string, unknown>) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}

export async function getAdminSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

export function setTokenCookie(token: string): { name: string; value: string; options: object } {
    return {
        name: COOKIE_NAME,
        value: token,
        options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax" as const,
            path: "/",
            maxAge: 60 * 60 * 24, // 24h
        },
    };
}

export function clearTokenCookie() {
    return {
        name: COOKIE_NAME,
        value: "",
        options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax" as const,
            path: "/",
            maxAge: 0,
        },
    };
}

export function verifyCredentials(username: string, password: string) {
    const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "portfolio2024";

    return (
        username === adminUsername &&
        password === adminPassword
    );
}
