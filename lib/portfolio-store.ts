import { db } from "./db";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { type Lang, translations } from "./i18n";

export interface PortfolioItem {
    id: string;
    titleEs: string;
    titleEn: string;
    titlePt: string;
    titleFr: string;
    subtitleEs: string;
    subtitleEn: string;
    subtitlePt: string;
    subtitleFr: string;
    category: "filme-video" | "comercial-branded" | "editorial" | "music-video";
    /** @deprecated use coverImage */
    image: string;
    coverImage: string;
    images: string[];
    videos: string[];
    featured: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
}

type Row = {
    id: string; title_es: string; title_en: string; title_pt: string; title_fr: string;
    subtitle_es: string; subtitle_en: string; subtitle_pt: string; subtitle_fr: string;
    category: string; image: string; cover_image: string; images: string[];
    videos: string[]; featured: boolean; order: number; created_at: string; updated_at: string;
};

function fromRow(row: Row): PortfolioItem {
    return {
        id: row.id,
        titleEs: row.title_es,
        titleEn: row.title_en,
        titlePt: row.title_pt,
        titleFr: row.title_fr,
        subtitleEs: row.subtitle_es,
        subtitleEn: row.subtitle_en,
        subtitlePt: row.subtitle_pt,
        subtitleFr: row.subtitle_fr,
        category: row.category as PortfolioItem["category"],
        image: row.image,
        coverImage: row.cover_image,
        images: row.images ?? [],
        videos: row.videos ?? [],
        featured: row.featured,
        order: row.order,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export async function getAllItems(): Promise<PortfolioItem[]> {
    const rows = await db.from("portfolio_items").select("*")
        .order("order", { ascending: true }).execute<Row>();
    return rows.map(fromRow);
}

export async function getItemById(id: string): Promise<PortfolioItem | null> {
    const row = await db.from("portfolio_items").select("*")
        .eq("id", id).execute<Row>();
    return row ? fromRow(row) : null;
}

export async function getFeaturedItems(): Promise<PortfolioItem[]> {
    const rows = await db.from("portfolio_items").select("*")
        .eq("featured", true).order("order", { ascending: true }).execute<Row>();
    return rows.map(fromRow);
}

export async function createItem(
    input: Omit<PortfolioItem, "id" | "createdAt" | "updatedAt">
): Promise<PortfolioItem> {
    const now = new Date().toISOString();
    const row: Row = {
        id: uuidv4(),
        title_es: input.titleEs, title_en: input.titleEn,
        title_pt: input.titlePt, title_fr: input.titleFr,
        subtitle_es: input.subtitleEs, subtitle_en: input.subtitleEn,
        subtitle_pt: input.subtitlePt, subtitle_fr: input.subtitleFr,
        category: input.category,
        image: input.image ?? input.coverImage,
        cover_image: input.coverImage,
        images: input.images, videos: input.videos,
        featured: input.featured, order: input.order,
        created_at: now, updated_at: now,
    };
    const result = await db.from("portfolio_items").insert(row).execute<Row>();
    return fromRow(result);
}

export async function updateItem(
    id: string,
    input: Partial<Omit<PortfolioItem, "id" | "createdAt">>
): Promise<PortfolioItem | null> {
    const patch: Partial<Row> = { updated_at: new Date().toISOString() };
    if (input.titleEs !== undefined) patch.title_es = input.titleEs;
    if (input.titleEn !== undefined) patch.title_en = input.titleEn;
    if (input.titlePt !== undefined) patch.title_pt = input.titlePt;
    if (input.titleFr !== undefined) patch.title_fr = input.titleFr;
    if (input.subtitleEs !== undefined) patch.subtitle_es = input.subtitleEs;
    if (input.subtitleEn !== undefined) patch.subtitle_en = input.subtitleEn;
    if (input.subtitlePt !== undefined) patch.subtitle_pt = input.subtitlePt;
    if (input.subtitleFr !== undefined) patch.subtitle_fr = input.subtitleFr;
    if (input.category !== undefined) patch.category = input.category;
    if (input.image !== undefined) patch.image = input.image;
    if (input.coverImage !== undefined) patch.cover_image = input.coverImage;
    if (input.images !== undefined) patch.images = input.images;
    if (input.videos !== undefined) patch.videos = input.videos;
    if (input.featured !== undefined) patch.featured = input.featured;
    if (input.order !== undefined) patch.order = input.order;

    const result = await db.from("portfolio_items").update(patch).eq("id", id).execute<Row>();
    return result ? fromRow(result) : null;
}

export async function deleteItem(id: string): Promise<boolean> {
    await db.from("portfolio_items").delete().eq("id", id).execute();
    return true;
}

export async function getStats() {
    const items = await getAllItems();
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString();
    return {
        total: items.length,
        featured: items.filter((i) => i.featured).length,
        byCategory: {
            "filme-video": items.filter((i) => i.category === "filme-video").length,
            "comercial-branded": items.filter((i) => i.category === "comercial-branded").length,
            editorial: items.filter((i) => i.category === "editorial").length,
            "music-video": items.filter((i) => i.category === "music-video").length,
        },
        recentCount: items.filter((i) => i.createdAt >= oneMonthAgo).length,
        recent: items
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5),
    };
}

// ── Static file-based functions (data is static, not in DB) ──────────────────

export function getGalleries(lang: Lang = "es") {
    const dataPath = path.join(process.cwd(), "data", "galleries.json");
    if (!fs.existsSync(dataPath)) return [];
    const { galleryTitles } = translations[lang].portfolio;
    const galleriesData: { id: string; images: string[] }[] = JSON.parse(
        fs.readFileSync(dataPath, "utf-8")
    );
    return galleriesData.map((item) => ({
        id: item.id,
        title: (galleryTitles as Record<string, string>)[item.id] ?? item.id.replace(/-/g, " "),
        images: item.images,
    }));
}

export function getPortfolioVideos(lang: Lang) {
    const videoPath = path.join(process.cwd(), "public", "portfolio");
    if (!fs.existsSync(videoPath)) return [];
    const { videoCaptions } = translations[lang];
    return fs
        .readdirSync(videoPath)
        .filter((file) => file.endsWith(".mp4"))
        .map((file) => {
            const caption = (videoCaptions as Record<string, { title: string; subtitle: string; description: string }>)[file];
            return {
                id: file,
                title: caption?.title ?? file.replace(".mp4", ""),
                subtitle: caption?.subtitle ?? "Video",
                description: caption?.description ?? "",
                src: `/portfolio/${file}`,
            };
        });
}

export function getShowreelVideos() {
    const videoPath = path.join(process.cwd(), "public", "videos");
    if (!fs.existsSync(videoPath)) return ["/videos/themountainpartII.mp4"];
    return fs
        .readdirSync(videoPath)
        .filter((file) => file.endsWith(".mp4"))
        .map((file) => `/videos/${file}`);
}
