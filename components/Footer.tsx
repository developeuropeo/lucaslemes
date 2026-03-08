import Link from "next/link";
import { type Lang, getT } from "@/lib/i18n";

const socialLinks = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/lucaslemesl",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
            </svg>
        ),
    },
    {
        label: "Vimeo",
        href: "https://vimeo.com/user254987707?fl=pp&fe=sh",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                <path d="M234.25,69.43C222.4,47.15,196.45,32,168,32c-29.76,0-53.42,16.29-64,43.52C94.64,54.34,77.19,40,56,40A48.05,48.05,0,0,0,8,88c0,13.23,3.77,16.17,7,18.67,3.69,2.83,8,4.27,13.67,4.27,12.52,0,25.85-9.41,36.05-25.17.54.92,1.07,1.87,1.57,2.87L93.48,145a8,8,0,0,0,13.72-.36C114.17,131.3,125.24,116,136,104.09V216a8,8,0,0,0,15.4,3.07C157.09,210.9,248,79.21,248,96,248,84.43,242.7,74.85,234.25,69.43ZM29.12,95.36C26.53,93.44,24,91.53,24,88A32,32,0,0,1,56,56c13.62,0,25.74,8.86,34.27,24.2C75.31,97.55,55.26,112,42.72,112,36.81,112,32.29,110,29.12,95.36ZM136,89.09C117.34,108.08,101.43,131,90.79,148.75L70.06,108.6c-3.2-6.33-6.84-11.94-10.8-16.68C74.8,79.28,89.29,72,104,72c13.62,0,24,7.75,32,17.09ZM152,216V106.68c14.84-19.61,37.12-41.08,65.14-28.44C229.38,82.46,232,89.21,232,96Z" />
            </svg>
        ),
    },
];

export default function Footer({ lang }: { lang: Lang }) {
    const t = getT(lang);
    return (
        <footer className="border-t border-brand-light-gray py-10 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-xs tracking-[0.2em] uppercase text-brand-gray font-light">
                    {t.footer.tagline}
                </p>
                <div className="flex items-center gap-6">
                    {socialLinks.map((s) => (
                        <Link
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="text-brand-gray hover:text-brand-black transition-colors duration-300"
                        >
                            {s.icon}
                        </Link>
                    ))}
                </div>
                <p className="text-xs tracking-widest uppercase text-brand-gray font-light">
                    © {new Date().getFullYear()} Lucas Lemes
                </p>
            </div>
        </footer>
    );
}
