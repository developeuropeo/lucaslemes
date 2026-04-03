import Image from "next/image";
import Link from "next/link";
import { type Lang, getT } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = getT(lang as Lang);
    return { title: t.about.metaTitle, description: t.about.metaDesc };
}

export default async function SobrePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = getT(lang as Lang).about;

    return (
        <div className="pt-16 md:pt-20">
            <div className="border-b border-brand-light-gray px-6 md:px-12 py-10 md:py-16">
                <p className="text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-3">{t.pageLabel}</p>
                <h1 className="text-3xl md:text-5xl font-light tracking-[0.08em] uppercase text-brand-black">{t.pageTitle}</h1>
            </div>

            <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
                    <div className="relative" style={{ aspectRatio: "3/4" }}>
                        <Image
                            src="/images/lucas-lemes-perfil.png"
                            alt="LEMS — Creative Direction"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-8">{t.role}</p>
                        <div className="space-y-5 text-sm font-light leading-relaxed text-brand-black/80">
                            {[t.bio1, t.bio2, t.bio3, t.bio4, t.bio5, t.bio6].filter(Boolean).map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="mt-12 space-y-3 text-xs tracking-widest uppercase font-light text-brand-gray border-t border-brand-light-gray pt-8">
                            <p>{t.skill1}</p>
                            <p>{t.skill2}</p>
                            <p>{t.skill3}</p>
                            <p>{t.skill4}</p>
                        </div>
                        <div className="mt-10">
                            <Link
                                href={`/${lang}/contato`}
                                className="text-xs tracking-[0.25em] uppercase border border-brand-black px-8 py-4 inline-block hover:bg-brand-black hover:text-white transition-all duration-300"
                            >
                                {t.cta}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
