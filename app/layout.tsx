import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "LEMS",
    description: "Creative Direction",
    icons: { icon: "/icon.svg" },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body className={`${inter.variable} ${playfair.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
