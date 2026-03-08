import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { type Lang, isValidLang } from "@/lib/i18n";
import { notFound } from "next/navigation";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-inter",
});

export async function generateStaticParams() {
    return [{ lang: "es" }, { lang: "en" }, { lang: "pt" }, { lang: "fr" }];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;

    const meta = {
        es: {
            title: "Lucas Lemes — Videomaker & Producción Visual",
            desc: "Portafolio de Lucas Lemes, videomaker y productor visual especializado en cine, branded content y producción audiovisual de alto nivel."
        },
        en: {
            title: "Lucas Lemes — Videomaker & Visual Production",
            desc: "Portfolio of Lucas Lemes, videomaker and visual producer specialised in cinema, branded content and high-end audiovisual production."
        },
        pt: {
            title: "Lucas Lemes — Videomaker & Produção Visual",
            desc: "Portfólio de Lucas Lemes, videomaker e produtor visual especializado em cinema, branded content e produção audiovisual de alto nível."
        },
        fr: {
            title: "Lucas Lemes — Vidéaste & Production Visuelle",
            desc: "Portfolio de Lucas Lemes, vidéaste et producteur visuel spécialisé dans le cinéma, le contenu de marque et la production audiovisuelle haut de gamme."
        }
    };

    const currentMeta = meta[lang as Lang] || meta.es;

    return {
        title: currentMeta.title,
        description: currentMeta.desc,
        keywords: lang === "pt" ? ["videomaker", "produtor visual", "branded content", "cinema", "publicidade"] :
            lang === "fr" ? ["vidéaste", "producteur visuel", "branded content", "cinéma", "publicité"] :
                lang === "es" ? ["videomaker", "productor visual", "branded content", "cine", "publicidad"] :
                    ["videomaker", "visual producer", "branded content", "film", "advertising"],
        openGraph: {
            title: currentMeta.title,
            description: currentMeta.desc,
            type: "website",
        },
    };
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    if (!isValidLang(lang)) notFound();

    return (
        <html lang={lang}>
            <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
                <Header lang={lang} />
                <main className="flex-1">{children}</main>
                <Footer lang={lang} />
            </body>
        </html>
    );
}
