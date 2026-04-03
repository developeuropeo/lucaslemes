import { type Lang, getT } from "@/lib/i18n";
import { getAllItems } from "@/lib/portfolio-store";
import VideoGallery from "@/components/VideoGallery";
import GallerySection from "@/components/GallerySection";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = getT(lang as Lang);
    return { title: t.portfolio.metaTitle, description: t.portfolio.metaDesc };
}

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const tp = getT(lang as Lang).portfolio;

    const items = await getAllItems();

    // Split items: those with videos → VideoGallery; those without → GallerySection
    const videoItems = items
        .filter((i) => i.videos && i.videos.length > 0)
        .map((i) => {
            const title = lang === "en" ? i.titleEn
                : lang === "pt" ? i.titlePt
                : lang === "fr" ? i.titleFr
                : i.titleEs;
            const subtitle = lang === "en" ? i.subtitleEn
                : lang === "pt" ? i.subtitlePt
                : lang === "fr" ? i.subtitleFr
                : i.subtitleEs;
            return {
                id: i.id,
                title,
                subtitle,
                description: "",
                src: i.videos[0],
            };
        });

    const galleryItems = items
        .filter((i) => (!i.videos || i.videos.length === 0) && i.images && i.images.length > 0 && i.coverImage)
        .map((i) => {
            const title = lang === "en" ? i.titleEn
                : lang === "pt" ? i.titlePt
                : lang === "fr" ? i.titleFr
                : i.titleEs;
            return {
                id: i.id,
                title,
                images: i.images,
            };
        });

    return (
        <div className="pt-16 md:pt-20">
            <div className="border-b border-brand-light-gray px-6 md:px-12 py-10 md:py-16">
                <p className="text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-3">{tp.pageLabel}</p>
                <h1 className="text-3xl md:text-5xl font-light tracking-[0.08em] uppercase text-brand-black">{tp.pageTitle}</h1>
            </div>

            <VideoGallery
                videos={videoItems}
                sectionTitle={tp.cat1}
            />

            <GallerySection
                galleries={galleryItems}
                sectionTitle={tp.cat3}
                label=""
            />
        </div>
    );
}
