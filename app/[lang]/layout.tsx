import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-playfair",
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
            title: "LEMS — Creative Direction",
            desc: "Portafolio de LEMS, dirección creativa especializada en cine, branded content y producción audiovisual de alto nivel."
        },
        en: {
            title: "LEMS — Creative Direction",
            desc: "Portfolio of LEMS, creative direction specialised in cinema, branded content and high-end audiovisual production."
        },
        pt: {
            title: "LEMS — Creative Direction",
            desc: "Portfólio da LEMS, direção criativa especializada em cinema, branded content e produção audiovisual de alto nível."
        },
        fr: {
            title: "LEMS — Creative Direction",
            desc: "Portfolio de LEMS, direction créative spécialisée dans le cinéma, le contenu de marque et la production audiovisuelle haut de gamme."
        }
    };

    const currentMeta = meta[lang as Lang] || meta.es;

    return {
        title: currentMeta.title,
        description: currentMeta.desc,
        keywords: lang === "pt" ? ["direção criativa", "creative direction", "branded content", "cinema", "publicidade"] :
            lang === "fr" ? ["direction créative", "creative direction", "branded content", "cinéma", "publicité"] :
                lang === "es" ? ["dirección creativa", "creative direction", "branded content", "cine", "publicidad"] :
                    ["creative direction", "branded content", "film", "advertising", "visual production"],
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
            <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}>
                <Header lang={lang} />
                <main className="flex-1">{children}</main>
                <Footer lang={lang} />
            </body>
        </html>
    );
}
