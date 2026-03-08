import { type Lang, getT } from "@/lib/i18n";
import ContatoClient from "./ContatoClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = getT(lang as Lang);
    return { title: t.contact.metaTitle, description: t.contact.metaDesc };
}

export default async function ContatoPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return <ContatoClient lang={lang as Lang} />;
}
