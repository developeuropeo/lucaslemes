"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Images, LogOut, Menu, X, ChevronRight, Mail } from "lucide-react";
import { useState } from "react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/portfolio", label: "Portfólio", icon: Images, exact: false },
    { href: "/admin/messages", label: "Mensagens", icon: Mail, exact: false },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isLogin = pathname === "/admin/login";

    if (isLogin) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                {children}
            </div>
        );
    }

    async function handleLogout() {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    }

    return (
        <div className="min-h-screen bg-[#0d0d0d] flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-[#111111] border-r border-white/5 z-30 flex flex-col transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:z-auto`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                    <span className="text-white font-light tracking-[0.2em] text-xs uppercase">
                        Admin Panel
                    </span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white/40 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-6 px-3">
                    {navItems.map((item) => {
                        const active = item.exact
                            ? pathname === item.href
                            : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all duration-150
                                    ${active
                                        ? "bg-white/10 text-white"
                                        : "text-white/40 hover:text-white/80 hover:bg-white/5"
                                    }`}
                            >
                                <item.icon size={16} />
                                {item.label}
                                {active && <ChevronRight size={12} className="ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
                    >
                        <LogOut size={16} />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="h-16 flex items-center justify-between px-6 bg-[#111111] border-b border-white/5 lg:hidden">
                    <span className="text-white/60 text-xs tracking-[0.2em] uppercase">Admin</span>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                </header>
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
