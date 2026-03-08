"use client";

import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    ArrowLeft, Save, Plus, Trash2, Star, Video, Image as ImageIcon,
    Upload, Link2, Loader2, Film
} from "lucide-react";
import Link from "next/link";
import type { PortfolioItem } from "@/lib/portfolio-store";

type FormData = Omit<PortfolioItem, "id" | "createdAt" | "updatedAt" | "image">;

interface PortfolioFormProps {
    initial?: Partial<FormData>;
    itemId?: string;
}

const CATEGORIES = [
    { value: "filme-video", label: "Filme / Vídeo" },
    { value: "comercial-branded", label: "Comercial / Branded Content" },
    { value: "editorial", label: "Editorial" },
    { value: "music-video", label: "Clipe Musical" },
];

const SELECT_BASE =
    "w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer";

function isEmbedLink(url: string) {
    return /vimeo\.com|youtube\.com|youtu\.be/.test(url);
}

function getVideoThumb(url: string) {
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/mqdefault.jpg`;
    return null;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-xs text-white/40 uppercase tracking-[0.12em] mb-2">{label}</label>
            {children}
        </div>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
    );
}

export default function PortfolioForm({ initial, itemId }: PortfolioFormProps) {
    const router = useRouter();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [newVideoUrl, setNewVideoUrl] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);

    const [form, setForm] = useState<FormData>({
        titleEs: initial?.titleEs ?? "",
        titleEn: initial?.titleEn ?? "",
        titlePt: initial?.titlePt ?? "",
        titleFr: initial?.titleFr ?? "",
        subtitleEs: initial?.subtitleEs ?? "",
        subtitleEn: initial?.subtitleEn ?? "",
        subtitlePt: initial?.subtitlePt ?? "",
        subtitleFr: initial?.subtitleFr ?? "",
        category: initial?.category ?? "filme-video",
        coverImage: initial?.coverImage ?? "",
        images: initial?.images ?? [],
        videos: initial?.videos ?? [],
        featured: initial?.featured ?? false,
        order: initial?.order ?? 99,
    });

    function set<K extends keyof FormData>(field: K, value: FormData[K]) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    /* ── Images ─────────────────────────────────── */

    function pushImage(url: string) {
        const trimmed = url.trim();
        if (!trimmed || form.images.includes(trimmed)) return;
        setForm((prev) => ({
            ...prev,
            images: [...prev.images, trimmed],
            coverImage: prev.coverImage || trimmed,
        }));
    }

    function addImageByUrl() {
        if (!newImageUrl.trim()) return;
        pushImage(newImageUrl);
        setNewImageUrl("");
    }

    async function uploadImage(file: File) {
        setUploadingImage(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
            if (!res.ok) throw new Error();
            const { url } = await res.json();
            pushImage(url);
        } catch {
            setError("Erro ao fazer upload da imagem.");
        } finally {
            setUploadingImage(false);
        }
    }

    function removeImage(url: string) {
        const updated = form.images.filter((img) => img !== url);
        setForm((prev) => ({
            ...prev,
            images: updated,
            coverImage: prev.coverImage === url ? (updated[0] ?? "") : prev.coverImage,
        }));
    }

    /* ── Videos ─────────────────────────────────── */

    function pushVideo(url: string) {
        const trimmed = url.trim();
        if (!trimmed || form.videos.includes(trimmed)) return;
        set("videos", [...form.videos, trimmed]);
    }

    function addVideoByUrl() {
        if (!newVideoUrl.trim()) return;
        pushVideo(newVideoUrl);
        setNewVideoUrl("");
    }

    async function uploadVideo(file: File) {
        setUploadingVideo(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
            if (!res.ok) throw new Error();
            const { url } = await res.json();
            pushVideo(url);
        } catch {
            setError("Erro ao fazer upload do vídeo.");
        } finally {
            setUploadingVideo(false);
        }
    }

    function removeVideo(url: string) {
        set("videos", form.videos.filter((v) => v !== url));
    }

    /* ── Submit ──────────────────────────────────── */

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (form.images.length === 0) {
            setError("Adicione pelo menos uma imagem ao projeto.");
            return;
        }
        setSaving(true);
        setError("");
        try {
            const payload = { ...form, image: form.coverImage };
            const url = itemId ? `/api/admin/portfolio/${itemId}` : "/api/admin/portfolio";
            const method = itemId ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Erro ao salvar");
            router.push("/admin/portfolio");
        } catch {
            setError("Erro ao salvar o projeto. Tente novamente.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/portfolio" className="text-white/30 hover:text-white/70 transition-colors">
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 className="text-white text-2xl font-light tracking-wide">
                        {itemId ? "Editar projeto" : "Novo projeto"}
                    </h1>
                    <p className="text-white/30 text-sm mt-0.5">
                        {itemId ? "Atualize os dados abaixo" : "Preencha os dados do novo projeto"}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Titles */}
                <div className="bg-[#161616] border border-white/5 rounded-xl p-5 space-y-4">
                    <p className="text-xs text-white/30 uppercase tracking-widest">Títulos</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Título em Espanhol">
                            <Input value={form.titleEs} onChange={(e) => set("titleEs", e.target.value)} placeholder="Deriva" required />
                        </Field>
                        <Field label="Título em Inglês">
                            <Input value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} placeholder="Drift" required />
                        </Field>
                        <Field label="Título em Português">
                            <Input value={form.titlePt} onChange={(e) => set("titlePt", e.target.value)} placeholder="Deriva" required />
                        </Field>
                        <Field label="Título em Francês">
                            <Input value={form.titleFr} onChange={(e) => set("titleFr", e.target.value)} placeholder="Dérive" required />
                        </Field>

                        <Field label="Subtítulo em Espanhol">
                            <Input value={form.subtitleEs} onChange={(e) => set("subtitleEs", e.target.value)} placeholder="Cortametraje · 2024" required />
                        </Field>
                        <Field label="Subtítulo em Inglês">
                            <Input value={form.subtitleEn} onChange={(e) => set("subtitleEn", e.target.value)} placeholder="Short film · 2024" required />
                        </Field>
                        <Field label="Subtítulo em Português">
                            <Input value={form.subtitlePt} onChange={(e) => set("subtitlePt", e.target.value)} placeholder="Curta-metragem · 2024" required />
                        </Field>
                        <Field label="Subtítulo em Francês">
                            <Input value={form.subtitleFr} onChange={(e) => set("subtitleFr", e.target.value)} placeholder="Court-métrage · 2024" required />
                        </Field>
                    </div>
                </div>

                {/* Category & settings */}
                <div className="bg-[#161616] border border-white/5 rounded-xl p-5 space-y-4">
                    <p className="text-xs text-white/30 uppercase tracking-widest">Configurações</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Categoria">
                            <select value={form.category} onChange={(e) => set("category", e.target.value as FormData["category"])} className={SELECT_BASE}>
                                {CATEGORIES.map((c) => (
                                    <option key={c.value} value={c.value} className="bg-[#1a1a1a] text-white">{c.label}</option>
                                ))}
                            </select>
                        </Field>
                        <Field label="Ordem de exibição">
                            <Input type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} min={1} />
                        </Field>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <div
                            onClick={() => set("featured", !form.featured)}
                            className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${form.featured ? "bg-amber-400" : "bg-white/10"}`}
                        >
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.featured ? "translate-x-5" : "translate-x-0.5"}`} />
                        </div>
                        <span className="text-sm text-white/60">Destacar na homepage</span>
                    </label>
                </div>

                {/* ── IMAGES ─────────────────────────────── */}
                <div className="bg-[#161616] border border-white/5 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-2">
                        <ImageIcon size={15} className="text-white/30" />
                        <p className="text-xs text-white/30 uppercase tracking-widest">Imagens</p>
                        <span className="ml-auto text-xs text-white/20">{form.images.length} adicionada(s)</span>
                    </div>

                    {/* Add by URL or Upload */}
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Link2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                            <input
                                type="url"
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImageByUrl())}
                                placeholder="Cole uma URL de imagem..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                            />
                        </div>
                        <button type="button" onClick={addImageByUrl} title="Adicionar URL" className="px-3 py-2.5 bg-white/8 hover:bg-white/15 text-white/60 hover:text-white rounded-lg transition-colors border border-white/10">
                            <Plus size={15} />
                        </button>
                        {/* Hidden file input */}
                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) uploadImage(file);
                                e.target.value = "";
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => imageInputRef.current?.click()}
                            disabled={uploadingImage}
                            title="Fazer upload de arquivo"
                            className="px-3 py-2.5 bg-white/8 hover:bg-white/15 text-white/60 hover:text-white rounded-lg transition-colors border border-white/10 disabled:opacity-50 flex items-center gap-1.5 text-xs"
                        >
                            {uploadingImage
                                ? <Loader2 size={14} className="animate-spin" />
                                : <><Upload size={14} /><span className="hidden sm:inline">Upload</span></>
                            }
                        </button>
                    </div>

                    {/* Image grid */}
                    {form.images.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {form.images.map((url) => {
                                const isCover = url === form.coverImage;
                                return (
                                    <div key={url} className="relative">
                                        <div
                                            className={`relative rounded-lg overflow-hidden border-2 transition-colors ${isCover ? "border-amber-400" : "border-transparent"}`}
                                            style={{ aspectRatio: "16/9" }}
                                        >
                                            <Image src={url} alt="" fill className="object-cover" unoptimized />
                                            {/* Dark gradient for legibility */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
                                        </div>

                                        {/* Cover badge — bottom left */}
                                        <button
                                            type="button"
                                            onClick={() => set("coverImage", url)}
                                            title={isCover ? "Imagem de capa" : "Definir como capa"}
                                            className={`absolute bottom-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium transition-all ${isCover
                                                ? "text-amber-400 bg-black/70"
                                                : "text-white/50 bg-black/50 hover:text-amber-400"
                                                }`}
                                        >
                                            <Star size={9} fill={isCover ? "currentColor" : "none"} />
                                            {isCover ? "Capa" : "Usar como capa"}
                                        </button>

                                        {/* Remove — top right, always visible */}
                                        <button
                                            type="button"
                                            onClick={() => removeImage(url)}
                                            title="Remover imagem"
                                            className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-black/70 text-white/70 hover:text-red-400 hover:bg-black/90 transition-all"
                                        >
                                            <Trash2 size={11} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {form.images.length === 0 && (
                        <div className="border border-dashed border-white/10 rounded-lg py-8 text-center text-white/20 text-xs">
                            Sem imagens — cole uma URL ou faça upload de arquivo
                        </div>
                    )}
                </div>

                {/* ── VIDEOS ─────────────────────────────── */}
                <div className="bg-[#161616] border border-white/5 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-2">
                        <Video size={15} className="text-white/30" />
                        <p className="text-xs text-white/30 uppercase tracking-widest">Vídeos</p>
                        <span className="ml-auto text-xs text-white/20">{form.videos.length} adicionado(s)</span>
                    </div>

                    <p className="text-[11px] text-white/20 -mt-1">
                        Links do Vimeo ou YouTube são adicionados diretamente. Outros arquivos serão enviados ao servidor.
                    </p>

                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Link2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                            <input
                                type="url"
                                value={newVideoUrl}
                                onChange={(e) => setNewVideoUrl(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addVideoByUrl())}
                                placeholder="vimeo.com/... youtube.com/... ou .mp4"
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                            />
                        </div>
                        <button type="button" onClick={addVideoByUrl} title="Adicionar URL" className="px-3 py-2.5 bg-white/8 hover:bg-white/15 text-white/60 hover:text-white rounded-lg transition-colors border border-white/10">
                            <Plus size={15} />
                        </button>
                        {/* Hidden file input for video */}
                        <input
                            ref={videoInputRef}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) uploadVideo(file);
                                e.target.value = "";
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => videoInputRef.current?.click()}
                            disabled={uploadingVideo}
                            title="Fazer upload de arquivo de vídeo"
                            className="px-3 py-2.5 bg-white/8 hover:bg-white/15 text-white/60 hover:text-white rounded-lg transition-colors border border-white/10 disabled:opacity-50 flex items-center gap-1.5 text-xs"
                        >
                            {uploadingVideo
                                ? <Loader2 size={14} className="animate-spin" />
                                : <><Upload size={14} /><span className="hidden sm:inline">Upload</span></>
                            }
                        </button>
                    </div>

                    {form.videos.length > 0 && (
                        <div className="space-y-2">
                            {form.videos.map((url) => {
                                const isEmbed = isEmbedLink(url);
                                const ytThumb = getVideoThumb(url);
                                return (
                                    <div key={url} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2.5 group">
                                        {ytThumb ? (
                                            <div className="relative w-12 h-8 rounded overflow-hidden shrink-0">
                                                <Image src={ytThumb} alt="" fill className="object-cover" unoptimized />
                                            </div>
                                        ) : isEmbed ? (
                                            <Film size={14} className="text-blue-400/60 shrink-0" />
                                        ) : (
                                            <Video size={14} className="text-white/30 shrink-0" />
                                        )}
                                        <span className="text-xs text-white/50 truncate flex-1">{url}</span>
                                        {isEmbed && (
                                            <span className="text-[10px] text-blue-400/60 shrink-0 hidden sm:block">
                                                {url.includes("vimeo") ? "Vimeo" : "YouTube"}
                                            </span>
                                        )}
                                        <button type="button" onClick={() => removeVideo(url)} className="text-white/40 hover:text-red-400/80 transition-colors shrink-0 p-1 rounded hover:bg-red-400/5">
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {form.videos.length === 0 && (
                        <div className="border border-dashed border-white/10 rounded-lg py-6 text-center text-white/20 text-xs">
                            Sem vídeos — cole um link ou faça upload de arquivo
                        </div>
                    )}
                </div>

                {error && (
                    <p className="text-red-400/80 text-xs text-center py-2 bg-red-400/5 rounded-lg border border-red-400/10">{error}</p>
                )}

                <div className="flex gap-3 pb-8">
                    <Link href="/admin/portfolio" className="px-5 py-3 rounded-lg border border-white/10 text-white/50 text-sm hover:border-white/20 hover:text-white/70 transition-all">
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-white text-black text-sm px-6 py-3 rounded-lg font-medium hover:bg-white/90 disabled:bg-white/30 disabled:cursor-not-allowed transition-all"
                    >
                        <Save size={15} />
                        {saving ? "Salvando..." : "Salvar projeto"}
                    </button>
                </div>
            </form>
        </div>
    );
}
