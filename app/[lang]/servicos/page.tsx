import Link from "next/link";
import { type Lang, getT } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = getT(lang as Lang);
    return { title: t.services.metaTitle, description: t.services.metaDesc };
}

export default async function ServicosPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = getT(lang as Lang).services;

    return (
        <div className="pt-16 md:pt-20">
            <div className="border-b border-brand-light-gray px-6 md:px-12 py-10 md:py-16">
                <p className="text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-3">{t.pageLabel}</p>
                <h1 className="text-3xl md:text-5xl font-light tracking-[0.08em] uppercase text-brand-black">{t.pageTitle}</h1>
            </div>

            <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
                <div className="divide-y divide-brand-light-gray">
                    {t.list.map((service) => (
                        <div key={service.number} className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                            <div className="md:col-span-1">
                                <span className="text-xs tracking-widest text-brand-gray font-light">{service.number}</span>
                            </div>
                            <div className="md:col-span-4">
                                <h2 className="text-sm tracking-[0.1em] uppercase font-normal text-brand-black leading-relaxed">{service.title}</h2>
                            </div>
                            <div className="md:col-span-7">
                                <p className="text-sm font-light leading-relaxed text-brand-black/70">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-12 border-t border-brand-light-gray text-center">
                    <p className="text-sm font-light tracking-widest text-brand-gray uppercase mb-8">{t.ctaLabel}</p>
                    <Link
                        href={`/${lang}/contato`}
                        className="inline-block text-xs tracking-[0.25em] uppercase font-normal border border-brand-black px-10 py-4 hover:bg-brand-black hover:text-white transition-all duration-300"
                    >
                        {t.ctaBtn}
                    </Link>
                </div>
            </section>
        </div>
    );
}
