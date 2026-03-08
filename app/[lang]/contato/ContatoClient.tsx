"use client";

import { useState } from "react";
import { type Lang, getT } from "@/lib/i18n";

export default function ContatoClient({ lang }: { lang: Lang }) {
    const t = getT(lang).contact;

    return (
        <div className="pt-16 md:pt-20">
            <div className="border-b border-brand-light-gray px-6 md:px-12 py-10 md:py-16">
                <p className="text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-3">{t.pageLabel}</p>
                <h1 className="text-3xl md:text-5xl font-light tracking-[0.08em] uppercase text-brand-black">{t.pageTitle}</h1>
            </div>

            <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    {/* Left: Info */}
                    <div>
                        <p className="text-sm font-light leading-relaxed text-brand-black/70 mb-12">{t.intro}</p>
                        <div className="space-y-6 text-xs tracking-[0.15em] uppercase font-light">
                            <div>
                                <p className="text-brand-gray mb-1">{t.emailLabel}</p>
                                <a href="mailto:contact@lucaslemes.com" className="text-brand-black hover:opacity-50 transition-opacity duration-300">
                                    contact@lucaslemes.com
                                </a>
                            </div>
                            <div>
                                <p className="text-brand-gray mb-1">{t.locationLabel}</p>
                                <p className="text-brand-black">{t.locationValue}</p>
                            </div>
                            <div>
                                <p className="text-brand-gray mb-1">{t.instagramLabel}</p>
                                <a href="https://www.instagram.com/lucaslemesl" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:opacity-50 transition-opacity duration-300">
                                    @lucaslemesl
                                </a>
                            </div>
                            <div>
                                <p className="text-brand-gray mb-1">{t.whatsappLabel}</p>
                                <a href="https://wa.me/34611300118" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:opacity-50 transition-opacity duration-300">
                                    +34 611 30 01 18
                                </a>
                            </div>
                            <div>
                                <p className="text-brand-gray mb-1">{t.vimeoLabel}</p>
                                <a href="https://vimeo.com/user254987707?fl=pp&fe=sh" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:opacity-50 transition-opacity duration-300">
                                    vimeo.com/lucaslemes
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <ContactForm t={t} lang={lang} />
                </div>
            </section>
        </div>
    );
}

type ContactT = ReturnType<typeof getT>["contact"];

function ContactForm({ t, lang }: { t: ContactT; lang: Lang }) {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || (
                    lang === "en" ? "Failed to send message" :
                        lang === "fr" ? "Échec de l'envoi du message" :
                            lang === "pt" ? "Falha ao enviar mensagem" :
                                "Falha ao enviar mensagem"
                ));
            }
            setSent(true);
        } catch (err: any) {
            setError(err.message || (
                lang === "en" ? "Error sending message. Please try again." :
                    lang === "fr" ? "Erreur lors de l'envoi du message. Veuillez réessayer." :
                        lang === "pt" ? "Erro ao enviar mensagem. Tente novamente." :
                            "Erro ao enviar mensagem. Tente novamente."
            ));
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="flex flex-col items-start justify-center py-12">
                <div className="w-12 h-px bg-brand-black mb-8" />
                <p className="text-sm font-light tracking-widest uppercase text-brand-black">{t.sentTitle}</p>
                <p className="mt-3 text-xs font-light text-brand-gray">{t.sentSub}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label className="block text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-2">{t.formName}</label>
                <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    className="w-full border-b border-brand-light-gray bg-transparent py-3 text-sm font-light text-brand-black placeholder:text-brand-gray/50 focus:outline-none focus:border-brand-black transition-colors duration-300"
                    placeholder={t.formNamePlaceholder}
                />
            </div>
            <div>
                <label className="block text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-2">{t.formEmail}</label>
                <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    className="w-full border-b border-brand-light-gray bg-transparent py-3 text-sm font-light text-brand-black placeholder:text-brand-gray/50 focus:outline-none focus:border-brand-black transition-colors duration-300"
                    placeholder={t.formEmailPlaceholder}
                />
            </div>
            <div>
                <label className="block text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-2">{t.formProject}</label>
                <select
                    name="project" value={form.project} onChange={handleChange}
                    className="w-full border-b border-brand-light-gray bg-transparent py-3 text-sm font-light text-brand-black focus:outline-none focus:border-brand-black transition-colors duration-300 cursor-pointer"
                >
                    <option value="">{t.formProjectDefault}</option>
                    {t.projectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-2">{t.formMessage}</label>
                <textarea
                    name="message" value={form.message} onChange={handleChange} rows={5} required
                    className="w-full border-b border-brand-light-gray bg-transparent py-3 text-sm font-light text-brand-black placeholder:text-brand-gray/50 focus:outline-none focus:border-brand-black transition-colors duration-300 resize-none"
                    placeholder={t.formMessagePlaceholder}
                />
            </div>
            {error && <p className="text-red-500 text-xs tracking-widest uppercase">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="text-xs tracking-[0.25em] uppercase font-normal border border-brand-black px-10 py-4 hover:bg-brand-black hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    lang === "en" ? "Sending..." :
                        lang === "fr" ? "Envoi en cours..." :
                            lang === "pt" ? "Enviando..." :
                                "Enviando..."
                ) : t.formSubmit}
            </button>
        </form>
    );
}
