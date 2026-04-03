"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type Lang, getT } from "@/lib/i18n";

export default function Header({ lang }: { lang: Lang }) {
    const t = getT(lang);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const navLinks = [
        { href: `/${lang}/sobre`, label: t.nav.about },
        { href: `/${lang}/portfolio`, label: t.nav.portfolio },
        { href: `/${lang}/servicos`, label: t.nav.services },
        { href: `/${lang}/contato`, label: t.nav.contact },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // Switch language keeping the same sub-path
    const switchLang = (newLang: Lang) => {
        const segments = pathname.split("/");
        segments[1] = newLang;
        router.push(segments.join("/") || `/${newLang}`);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? "border-b border-brand-light-gray" : ""
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <Link href={`/${lang}`} className="hover:opacity-70 transition-opacity duration-300 flex flex-col items-start">
                    <span className="text-lg md:text-xl tracking-[0.3em] font-normal uppercase text-brand-black font-[family-name:var(--font-playfair)]">
                        LEMS
                    </span>
                    <span className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-brand-gray font-light">
                        Creative Direction
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link text-xs tracking-widest uppercase font-normal transition-colors duration-300 ${pathname === link.href ? "opacity-40" : "text-brand-black"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Language switcher */}
                    <div className="flex items-center gap-2 ml-4 border-brand-light-gray pl-6">
                        <button
                            onClick={() => switchLang("es")}
                            className={`text-xs tracking-widest uppercase font-normal transition-opacity duration-200 ${lang === "es" ? "text-brand-black" : "text-brand-gray hover:text-brand-black"
                                }`}
                        >
                            ES
                        </button>
                        <span className="text-brand-light-gray text-xs">|</span>
                        <button
                            onClick={() => switchLang("en")}
                            className={`text-xs tracking-widest uppercase font-normal transition-opacity duration-200 ${lang === "en" ? "text-brand-black" : "text-brand-gray hover:text-brand-black"
                                }`}
                        >
                            EN
                        </button>
                        <span className="text-brand-light-gray text-xs">|</span>
                        <button
                            onClick={() => switchLang("pt")}
                            className={`text-xs tracking-widest uppercase font-normal transition-opacity duration-200 ${lang === "pt" ? "text-brand-black" : "text-brand-gray hover:text-brand-black"
                                }`}
                        >
                            PT
                        </button>
                        <span className="text-brand-light-gray text-xs">|</span>
                        <button
                            onClick={() => switchLang("fr")}
                            className={`text-xs tracking-widest uppercase font-normal transition-opacity duration-200 ${lang === "fr" ? "text-brand-black" : "text-brand-gray hover:text-brand-black"
                                }`}
                        >
                            FR
                        </button>
                    </div>
                </nav>

                {/* Mobile: lang switcher + hamburger */}
                <div className="md:hidden flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => switchLang("es")}
                            className={`text-xs tracking-widest uppercase font-normal ${lang === "es" ? "text-brand-black" : "text-brand-gray"
                                }`}
                        >
                            ES
                        </button>
                        <span className="text-brand-light-gray text-xs">|</span>
                        <button
                            onClick={() => switchLang("en")}
                            className={`text-xs tracking-widest uppercase font-normal ${lang === "en" ? "text-brand-black" : "text-brand-gray"
                                }`}
                        >
                            EN
                        </button>
                        <span className="text-brand-light-gray text-xs">|</span>
                        <button
                            onClick={() => switchLang("pt")}
                            className={`text-xs tracking-widest uppercase font-normal ${lang === "pt" ? "text-brand-black" : "text-brand-gray"
                                }`}
                        >
                            PT
                        </button>
                        <span className="text-brand-light-gray text-xs">|</span>
                        <button
                            onClick={() => switchLang("fr")}
                            className={`text-xs tracking-widest uppercase font-normal ${lang === "fr" ? "text-brand-black" : "text-brand-gray"
                                }`}
                        >
                            FR
                        </button>
                    </div>
                    <button
                        aria-label={t.nav.menuLabel}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex flex-col gap-1.5 p-2"
                    >
                        <span className={`block w-6 h-px bg-brand-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block w-6 h-px bg-brand-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-6 h-px bg-brand-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            <div
                className={`md:hidden bg-white border-t border-brand-light-gray overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <nav className="flex flex-col px-6 py-6 gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-xs tracking-widest uppercase font-normal transition-opacity duration-200 ${pathname === link.href ? "opacity-40" : "text-brand-black hover:opacity-60"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
