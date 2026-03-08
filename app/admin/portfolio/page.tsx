"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Star, Pencil, Trash2, Film, Tv, Music, BookImage, AlertTriangle, X } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio-store";

const CATEGORY_LABELS: Record<string, string> = {
    "filme-video": "Filme / Vídeo",
    "comercial-branded": "Comercial / Branded",
    "editorial": "Editorial",
    "music-video": "Clipe Musical",
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
    "filme-video": Film,
    "comercial-branded": Tv,
    "editorial": BookImage,
    "music-video": Music,
};

export default function PortfolioAdmin() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchItems = useCallback(async () => {
        const res = await fetch("/api/admin/portfolio");
        const data = await res.json();
        setItems(data);
        setLoading(false);
    }, []);

    useEffect(() => { fetchItems(); }, [fetchItems]);

    async function toggleFeatured(item: PortfolioItem) {
        await fetch(`/api/admin/portfolio/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ featured: !item.featured }),
        });
        fetchItems();
    }

    async function confirmDelete(id: string) {
        setDeleting(true);
        await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
        setDeletingId(null);
        setDeleting(false);
        fetchItems();
    }

    const filtered = items
        .filter((i) => filter === "all" || i.category === filter)
        .filter((i) =>
            i.titleEs.toLowerCase().includes(search.toLowerCase()) ||
            i.titleEn.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-white text-2xl font-light tracking-wide">Portfólio</h1>
                    <p className="text-white/30 text-sm mt-1">{items.length} projetos cadastrados</p>
                </div>
                <Link
                    href="/admin/portfolio/new"
                    className="flex items-center gap-2 bg-white text-black text-xs font-medium tracking-[0.12em] uppercase px-4 py-2.5 rounded-lg hover:bg-white/90 transition-colors"
                >
                    <Plus size={14} />
                    Novo projeto
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-5 flex-wrap">
                <div className="relative flex-1 min-w-48">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                        type="text"
                        placeholder="Buscar projeto..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#161616] border border-white/5 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-[#1a1a1a] border border-white/5 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 appearance-none cursor-pointer"
                >
                    <option value="all" className="bg-[#1a1a1a] text-white">Todas as categorias</option>
                    {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
                        <option key={v} value={v} className="bg-[#1a1a1a] text-white">{l}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="py-20 text-center text-white/20 text-sm">Carregando...</div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center text-white/20 text-sm">Nenhum projeto encontrado</div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {filtered.map((item) => {
                            const Icon = CATEGORY_ICONS[item.category] ?? Film;
                            const isConfirmingDelete = deletingId === item.id;

                            return (
                                <div key={item.id}>
                                    {/* Main row */}
                                    <div className={`flex items-center gap-4 px-5 py-4 transition-colors ${isConfirmingDelete ? "bg-red-950/20" : "hover:bg-white/[0.02]"}`}>
                                        {/* Thumbnail */}
                                        <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0 flex items-center justify-center">
                                            {(item.coverImage || item.image) ? (
                                                <Image src={item.coverImage || item.image} alt={item.titleEs} fill className="object-cover" unoptimized />
                                            ) : (
                                                <span className="text-white/20 text-xl">▶</span>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white/80 text-sm font-medium truncate">{item.titleEs}</p>
                                            <p className="text-white/30 text-xs">{item.subtitleEs}</p>
                                        </div>

                                        {/* Category */}
                                        <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/30 shrink-0">
                                            <Icon size={12} />
                                            {CATEGORY_LABELS[item.category]}
                                        </div>

                                        {/* Order */}
                                        <span className="hidden md:block text-xs text-white/20 w-8 text-center shrink-0">
                                            #{item.order}
                                        </span>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1 shrink-0">
                                            {/* Featured */}
                                            <button
                                                onClick={() => toggleFeatured(item)}
                                                title={item.featured ? "Remover destaque" : "Marcar como destaque"}
                                                className={`p-1.5 rounded-lg transition-all ${item.featured
                                                    ? "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20"
                                                    : "text-white/30 hover:text-amber-400/70 hover:bg-white/5"
                                                    }`}
                                            >
                                                <Star size={14} fill={item.featured ? "currentColor" : "none"} />
                                            </button>

                                            {/* Edit */}
                                            <Link
                                                href={`/admin/portfolio/${item.id}/edit`}
                                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5 transition-all text-xs"
                                            >
                                                <Pencil size={13} />
                                                <span className="hidden sm:inline">Editar</span>
                                            </Link>

                                            {/* Delete trigger */}
                                            <button
                                                onClick={() => setDeletingId(isConfirmingDelete ? null : item.id)}
                                                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all text-xs ${isConfirmingDelete
                                                    ? "text-red-400 bg-red-400/10"
                                                    : "text-white/40 hover:text-red-400 hover:bg-red-400/5"
                                                    }`}
                                            >
                                                {isConfirmingDelete ? <X size={13} /> : <Trash2 size={13} />}
                                                <span className="hidden sm:inline">
                                                    {isConfirmingDelete ? "Cancelar" : "Excluir"}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Inline delete confirmation panel */}
                                    {isConfirmingDelete && (
                                        <div className="flex items-center justify-between gap-4 px-5 py-3 bg-red-950/30 border-t border-red-500/10">
                                            <div className="flex items-center gap-2 text-red-400/80">
                                                <AlertTriangle size={14} className="shrink-0" />
                                                <span className="text-xs">
                                                    Excluir <strong className="text-white/70">{item.titleEs}</strong> permanentemente?
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => confirmDelete(item.id)}
                                                disabled={deleting}
                                                className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 disabled:bg-red-900 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0"
                                            >
                                                <Trash2 size={13} />
                                                {deleting ? "Excluindo..." : "Sim, excluir"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
