import { getStats } from "@/lib/portfolio-store";
import Link from "next/link";
import { Film, Star, TrendingUp, Tv, Music, BookImage, Plus, ArrowRight } from "lucide-react";
import Image from "next/image";

function StatCard({
    label, value, icon: Icon, sub,
}: { label: string; value: number; icon: React.ElementType; sub?: string }) {
    return (
        <div className="bg-[#161616] border border-white/5 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-white/50" />
            </div>
            <div>
                <p className="text-3xl font-light text-white">{value}</p>
                <p className="text-xs text-white/40 mt-0.5 tracking-wide uppercase">{label}</p>
                {sub && <p className="text-xs text-white/20 mt-1">{sub}</p>}
            </div>
        </div>
    );
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-white text-2xl font-light tracking-wide">Dashboard</h1>
                    <p className="text-white/30 text-sm mt-1">Visão geral do portfólio</p>
                </div>
                <Link
                    href="/admin/portfolio/new"
                    className="flex items-center gap-2 bg-white text-black text-xs font-medium tracking-[0.12em] uppercase px-4 py-2.5 rounded-lg hover:bg-white/90 transition-colors"
                >
                    <Plus size={14} />
                    Novo projeto
                </Link>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                <StatCard label="Total de projetos" value={stats.total} icon={BookImage} />
                <StatCard label="Em destaque" value={stats.featured} icon={Star} sub="Aparecem na homepage" />
                <StatCard label="Adicionados no mês" value={stats.recentCount} icon={TrendingUp} />
                <StatCard label="Filme / Vídeo" value={stats.byCategory["filme-video"]} icon={Film} />
                <StatCard label="Comercial / Branded" value={stats.byCategory["comercial-branded"]} icon={Tv} />
                <StatCard label="Editorial / Clipe" value={stats.byCategory["editorial"] + stats.byCategory["music-video"]} icon={Music} />
            </div>

            {/* Recent projects table */}
            <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <h2 className="text-white/80 text-sm font-medium">Projetos recentes</h2>
                    <Link href="/admin/portfolio" className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors">
                        Ver todos <ArrowRight size={12} />
                    </Link>
                </div>
                <div className="divide-y divide-white/5">
                    {stats.recent.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0 flex items-center justify-center">
                                {(item.coverImage || item.image) ? (
                                    <Image src={item.coverImage || item.image} alt={item.titleEs} fill className="object-cover" unoptimized />
                                ) : (
                                    <span className="text-white/20 text-lg">▶</span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white/80 text-sm truncate">{item.titleEs}</p>
                                <p className="text-white/30 text-xs">{item.subtitleEs}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                {item.featured && (
                                    <span className="text-xs text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-full">
                                        Destaque
                                    </span>
                                )}
                                <Link
                                    href={`/admin/portfolio/${item.id}/edit`}
                                    className="text-xs text-white/30 hover:text-white/70 transition-colors"
                                >
                                    Editar
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
