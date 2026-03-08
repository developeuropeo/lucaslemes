"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle } from "lucide-react";

export default function DeleteZone({ itemId, title }: { itemId: string; title: string }) {
    const router = useRouter();
    const [confirming, setConfirming] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        setDeleting(true);
        setError("");
        try {
            const res = await fetch(`/api/admin/portfolio/${itemId}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            router.push("/admin/portfolio");
            router.refresh();
        } catch {
            setError("Erro ao excluir. Tente novamente.");
            setDeleting(false);
        }
    }

    return (
        <div className="border border-red-500/10 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-red-950/20">
                <div className="flex items-center gap-2">
                    <AlertTriangle size={15} className="text-red-400/70 shrink-0" />
                    <div>
                        <p className="text-sm text-red-400/80 font-medium">Zona de perigo</p>
                        <p className="text-xs text-white/25 mt-0.5">Esta ação não pode ser desfeita</p>
                    </div>
                </div>

                {!confirming && (
                    <button
                        type="button"
                        onClick={() => setConfirming(true)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500/20 text-red-400/70 hover:border-red-500/40 hover:text-red-400 hover:bg-red-400/5 transition-all text-xs"
                    >
                        <Trash2 size={13} />
                        Excluir projeto
                    </button>
                )}
            </div>

            {/* Confirm panel */}
            {confirming && (
                <div className="px-5 py-4 bg-red-950/10 border-t border-red-500/10 space-y-3">
                    <p className="text-sm text-white/60">
                        Você está prestes a excluir permanentemente{" "}
                        <span className="text-white/90 font-medium">{title}</span>.
                        Todas as imagens e vídeos associados serão removidos.
                    </p>
                    {error && <p className="text-xs text-red-400">{error}</p>}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setConfirming(false)}
                            disabled={deleting}
                            className="px-4 py-2 rounded-lg border border-white/10 text-white/40 text-xs hover:border-white/20 hover:text-white/60 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleting}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-900 text-white rounded-lg text-xs font-medium transition-colors"
                        >
                            <Trash2 size={13} />
                            {deleting ? "Excluindo..." : "Confirmar exclusão"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
