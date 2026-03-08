"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

interface PortfolioGridItem {
    title: string;
    subtitle: string;
    image: string;
    alt: string;
}

interface PortfolioGridProps {
    items: PortfolioGridItem[];
    categoryLabel?: string;
    id: string;
}

export default function PortfolioGrid({ items, categoryLabel, id }: PortfolioGridProps) {
    const [lightbox, setLightbox] = useState<{ isOpen: boolean; currentIndex: number }>({
        isOpen: false,
        currentIndex: 0
    });

    return (
        <section id={id} className={`max-w-7xl mx-auto px-6 md:px-12 ${categoryLabel ? "py-20 md:py-28 border-b border-brand-light-gray" : "pb-20 md:pb-28 border-b border-brand-light-gray"}`}>
            {categoryLabel && <h2 className="text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-12 md:mb-20">{categoryLabel}</h2>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
                {items.map((item, idx) => (
                    <div
                        key={item.title}
                        className="portfolio-item group cursor-pointer"
                        onClick={() => setLightbox({ isOpen: true, currentIndex: idx })}
                    >
                        <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
                            <Image
                                src={item.image}
                                alt={item.alt}
                                fill
                                className="object-cover grayscale group-hover:grayscale-[40%] transition-all duration-700"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="overlay" />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xs tracking-[0.15em] uppercase font-normal text-brand-black">{item.title}</h3>
                            <p className="mt-1 text-xs tracking-widest text-brand-gray font-light">{item.subtitle}</p>
                            <div className="mt-3 h-px w-full bg-brand-light-gray" />
                        </div>
                    </div>
                ))}
            </div>

            <Lightbox
                isOpen={lightbox.isOpen}
                onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
                currentIndex={lightbox.currentIndex}
                items={items.map(i => ({ src: i.image, type: "image", title: i.title }))}
                onNavigate={(index) => setLightbox(prev => ({ ...prev, currentIndex: index }))}
            />
        </section>
    );
}
