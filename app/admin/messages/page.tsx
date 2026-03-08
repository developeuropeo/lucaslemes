"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Mail, MailOpen, Trash2, Calendar, MessageSquare, Briefcase } from "lucide-react";
import type { ContactMessage } from "@/lib/message-store";

export default function AdminMessages() {
    const router = useRouter();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = useCallback(async () => {
        const res = await fetch("/api/admin/messages");
        if (res.status === 401) {
            router.push("/admin/login");
            return;
        }
        const data = await res.json();
        setMessages(data);
        setLoading(false);
    }, [router]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    async function handleMarkAsRead(id: string) {
        await fetch(`/api/admin/messages/${id}`, { method: "POST" });
        fetchMessages();
    }

    async function handleDelete(id: string) {
        if (!confirm("Excluir esta mensagem permanentemente?")) return;
        await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
        fetchMessages();
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-white text-2xl font-light tracking-wide">Mensagens</h1>
                <p className="text-white/30 text-sm mt-1">
                    {messages.length} mensagens recebidas pelo formulário de contato
                </p>
            </div>

            {loading ? (
                <div className="py-20 text-center text-white/20 text-sm">Carregando mensagens...</div>
            ) : messages.length === 0 ? (
                <div className="bg-[#161616] border border-white/5 rounded-xl py-20 text-center text-white/20 text-sm">
                    Nenhuma mensagem recebida ainda.
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`bg-[#161616] border transition-all duration-300 rounded-xl overflow-hidden ${msg.read ? "border-white/5 opacity-60" : "border-white/20"
                                }`}
                        >
                            {/* Header */}
                            <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${msg.read ? "bg-white/5 text-white/20" : "bg-white/10 text-white"}`}>
                                        {msg.read ? <MailOpen size={18} /> : <Mail size={18} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-medium text-sm">{msg.name}</span>
                                            <span className="text-white/20 text-xs">•</span>
                                            <span className="text-white/40 text-xs">{msg.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-0.5">
                                            <span className="flex items-center gap-1 text-[10px] text-white/20 uppercase tracking-widest">
                                                <Calendar size={10} />
                                                {new Date(msg.createdAt).toLocaleDateString("pt-BR", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                            {msg.project && (
                                                <span className="flex items-center gap-1 text-[10px] text-amber-400/60 uppercase tracking-widest">
                                                    <Briefcase size={10} />
                                                    Projeto: {msg.project}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-auto">
                                    {!msg.read && (
                                        <button
                                            onClick={() => handleMarkAsRead(msg.id)}
                                            className="px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-medium bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all"
                                        >
                                            Marcar como lida
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                        title="Excluir mensagem"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="px-6 py-5 bg-[#1a1a1a]/30">
                                <div className="flex gap-3">
                                    <MessageSquare size={14} className="text-white/10 shrink-0 mt-1" />
                                    <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap font-light">
                                        {msg.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
