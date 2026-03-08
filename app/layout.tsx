import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Lucas Lemes",
    description: "Videomaker · Produção Visual",
    icons: { icon: "/icon.svg" },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body className={`${inter.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
