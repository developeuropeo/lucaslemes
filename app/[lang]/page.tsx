import Link from "next/link";
import { type Lang, getT } from "@/lib/i18n";
import Hero from "@/components/Hero";
import VideoGallery from "@/components/VideoGallery";
import PortfolioGrid from "@/components/PortfolioGrid";
import Image from "next/image";

import { getShowreelVideos, getPortfolioVideos, getAllItems } from "@/lib/portfolio-store";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = getT(lang as Lang);
    const h = t.home;

    const showreelVideos = getShowreelVideos();
    const portfolioVideos = getPortfolioVideos(lang as "es" | "en");
    const featuredVideos = portfolioVideos.slice(0, 3);
    const items = await getAllItems();

    const cat1Items = items
        .filter((i) => i.category === "filme-video")
        .map((i) => {
            let title = i.titleEs;
            let subtitle = i.subtitleEs;

            if (lang === "en") { title = i.titleEn; subtitle = i.subtitleEn; }
            else if (lang === "pt") { title = i.titlePt; subtitle = i.subtitlePt; }
            else if (lang === "fr") { title = i.titleFr; subtitle = i.subtitleFr; }

            return {
                title,
                subtitle,
                image: i.coverImage,
                alt: title,
            };
        });

    const clientLogos = [
        { src: "/images/logos-cases/Cadillac.png", alt: "Cadillac" },
        { src: "/images/logos-cases/cnn.png", alt: "CNN" },
        { src: "/images/logos-cases/fashion-week-london.png", alt: "London Fashion Week" },
        { src: "/images/logos-cases/fashion-week-milan.png", alt: "Milan Fashion Week" },
        { src: "/images/logos-cases/fashion-week-paris.png", alt: "Paris Fashion Week" },
        { src: "/images/logos-cases/itau.png", alt: "Itaú" },
        { src: "/images/logos-cases/loreal-paris.png", alt: "L'Oréal Paris" },
        { src: "/images/logos-cases/meta.png", alt: "Meta" },
    ];

    return (
        <>
            {/* ── Hero / Showreel ──────────────────────────────────── */}
            <Hero t={h} videoSources={showreelVideos} />

            {/* ── Featured Videos ─────────────────────────────────────────── */}
            <VideoGallery
                videos={featuredVideos}
                label={t.portfolio.pageLabel}
                sectionTitle={t.home.portfolioLabel}
            />

            <div className="flex justify-center -mt-8 mb-32">
                <Link
                    href={`/${lang}/portfolio`}
                    className="text-[10px] tracking-[0.3em] uppercase font-light text-brand-black hover:opacity-50 transition-all duration-300 border-b border-brand-black/20 pb-1"
                >
                    {h.viewAll}
                </Link>
            </div>

            {/* ── Portfolio Grid (Photography/Featured) ──────────────────── */}
            <PortfolioGrid
                id="cat1"
                items={cat1Items}
                categoryLabel={t.home.category1Title}
            />

            {/* ── Casos de Sucesso (Logos) ─────────────────────────────────── */}
            <section className="px-6 md:px-12 py-24 border-t border-brand-light-gray bg-brand-light-gray/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[10px] tracking-[0.3em] uppercase font-light text-brand-gray mb-3">{h.casesLabel}</p>
                        <h2 className="text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-brand-black">
                            {h.casesTitle}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-x-20 md:gap-y-16 items-center justify-items-center opacity-70">
                        {clientLogos.map((logo) => (
                            <div key={logo.alt} className="relative w-full h-12 md:h-16 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Tagline & CTA ───────────────────────────────────────────── */}
            <section className="px-6 md:px-12 py-24 md:py-40 text-center">
                <p className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.08em] uppercase leading-tight text-brand-black max-w-4xl mx-auto">
                    {h.tagline1}
                    <br />
                    <span className="text-brand-gray">{h.tagline2}</span>
                </p>
                <div className="mt-12">
                    <Link
                        href={`/${lang}/contato`}
                        className="inline-block text-xs tracking-[0.25em] uppercase font-normal border border-brand-black px-8 py-4 hover:bg-brand-black hover:text-white transition-all duration-300"
                    >
                        {h.cta}
                    </Link>
                </div>
            </section>
        </>
    );
}
