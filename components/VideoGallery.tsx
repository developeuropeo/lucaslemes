"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";
import LazyVideo from "./LazyVideo";

interface VideoItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    src: string;
}

export default function VideoGallery({ videos, label, sectionTitle }: { videos: VideoItem[]; label?: string; sectionTitle?: string }) {
    const [lightbox, setLightbox] = useState<{ isOpen: boolean; currentIndex: number }>({
        isOpen: false,
        currentIndex: 0
    });

    if (videos.length === 0) return null;

    return (
        <section className={`${label ? "pt-20 md:pt-28 border-t border-brand-light-gray" : ""}`}>
            {label && sectionTitle && (
                <div className="border-b border-brand-light-gray px-6 md:px-12 py-10 md:py-16">
                    <p className="text-xs tracking-[0.2em] uppercase font-light text-brand-gray mb-3">{label}</p>
                    <h2 className="text-3xl md:text-5xl font-light tracking-[0.08em] uppercase text-brand-black">{sectionTitle}</h2>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                    {videos.map((video, idx) => (
                        <div
                            key={video.id}
                            className="group cursor-pointer active:opacity-70 transition-opacity"
                            onClick={() => setLightbox({ isOpen: true, currentIndex: idx })}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="relative aspect-video overflow-hidden bg-black">
                                <LazyVideo
                                    src={video.src}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    onMouseEnter={(e) => e.currentTarget.play()}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.pause();
                                        e.currentTarget.currentTime = 0;
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                                    <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-col gap-1">
                                <h3 className="text-xs tracking-[0.15em] uppercase font-normal text-brand-black">{video.title}</h3>
                                <p className="text-[10px] tracking-[0.2em] uppercase font-light text-brand-gray">{video.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Lightbox
                isOpen={lightbox.isOpen}
                onClose={() => setLightbox({ ...lightbox, isOpen: false })}
                items={videos.map(v => ({ src: v.src, type: "video", title: v.title, subtitle: v.subtitle, description: v.description }))}
                currentIndex={lightbox.currentIndex}
                onNavigate={(index) => setLightbox({ ...lightbox, currentIndex: index })}
            />
        </section>
    );
}
