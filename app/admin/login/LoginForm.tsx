"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const from = searchParams.get("from") ?? "/admin";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (!res.ok) {
                setError("Usuário ou senha incorretos.");
                return;
            }
            // Full page reload to ensure the HttpOnly cookie is sent
            // on the next request before the middleware checks it.
            window.location.href = from;
        } catch {
            setError("Erro de conexão. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-sm mx-auto px-4">
            <div className="mb-8 flex justify-center">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Lock size={20} className="text-white/60" />
                </div>
            </div>

            <h1 className="text-white text-xl font-light tracking-[0.15em] text-center mb-1 uppercase">
                Admin
            </h1>
            <p className="text-white/30 text-xs text-center mb-8 tracking-widest uppercase">
                Lucas Lemes
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Usuário</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="admin"
                    />
                </div>

                <div>
                    <label className="block text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Senha</label>
                    <div className="relative">
                        <input
                            type={showPwd ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPwd(!showPwd)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                        >
                            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {error && (
                    <p className="text-red-400/80 text-xs text-center py-2 bg-red-400/5 rounded-lg border border-red-400/10">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black text-xs font-medium tracking-[0.15em] uppercase py-3 rounded-lg hover:bg-white/90 disabled:bg-white/30 disabled:cursor-not-allowed transition-all duration-200"
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}
