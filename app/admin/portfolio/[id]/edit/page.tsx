import { getItemById } from "@/lib/portfolio-store";
import { notFound } from "next/navigation";
import PortfolioForm from "../../PortfolioForm";
import DeleteZone from "./DeleteZone";

export default async function EditPortfolioItem({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getItemById(id);
    if (!item) notFound();

    return (
        <div className="max-w-2xl mx-auto space-y-5">
            <PortfolioForm
                itemId={id}
                initial={{
                    titleEs: item.titleEs,
                    titleEn: item.titleEn,
                    subtitleEs: item.subtitleEs,
                    subtitleEn: item.subtitleEn,
                    category: item.category,
                    coverImage: item.coverImage || item.image,
                    images: item.images?.length ? item.images : [item.image],
                    videos: item.videos ?? [],
                    featured: item.featured,
                    order: item.order,
                }}
            />
            <DeleteZone itemId={id} title={item.titleEs} />
        </div>
    );
}
