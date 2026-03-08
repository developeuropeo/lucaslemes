"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

interface Gallery {
    id: string;
    title: string;
    images: string[];
}

export default function GallerySection({ galleries, label, sectionTitle }: { galleries: Gallery[]; label: string; sectionTitle: string }) {
    const [lightbox, setLightbox] = useState<{ isOpen: boolean; currentIndex: number; items: string[] }>({
        isOpen: false,
        currentIndex: 0,
        items: []
    });

    if (galleries.length === 0) return null;

    const openLightbox = (images: string[], index: number) => {
        setLightbox({ isOpen: true, currentIndex: index, items: images });
    };

    return (
        <section className="pt-20 md:pt-28">
            <div className="border-y border-brand-light-gray px-6 md:px-12 py-10 md:py-16 bg-brand-light-gray/10">
                <p className="text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-3">{label}</p>
                <h2 className="text-3xl md:text-5xl font-light tracking-[0.08em] uppercase text-brand-black">{sectionTitle}</h2>
            </div>

            {galleries.map((gallery) => (
                <div key={gallery.id} className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-b border-brand-light-gray last:border-0">
                    <h3 className="text-xs tracking-[0.2em] uppercase font-normal text-brand-black mb-12 md:mb-16 border-l-2 border-brand-black pl-4">
                        {gallery.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
                        {gallery.images.map((img, idx) => (
                            <div
                                key={idx}
                                className="overflow-hidden bg-brand-light-gray/20 cursor-zoom-in group"
                                onClick={() => openLightbox(gallery.images, idx)}
                            >
                                <div className="relative aspect-[2/3] overflow-hidden">
                                    <Image
                                        src={img}
                                        alt={`${gallery.title} - ${idx + 1}`}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <Lightbox
                isOpen={lightbox.isOpen}
                onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
                currentIndex={lightbox.currentIndex}
                items={lightbox.items.map(src => ({ src, type: "image" }))}
                onNavigate={(index) => setLightbox(prev => ({ ...prev, currentIndex: index }))}
            />
        </section>
    );
}
