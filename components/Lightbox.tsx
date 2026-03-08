"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    items: { src: string; type: "image" | "video"; title?: string; subtitle?: string; description?: string }[];
    currentIndex: number;
    onNavigate: (index: number) => void;
}

export default function Lightbox({ isOpen, onClose, items, currentIndex, onNavigate }: LightboxProps) {
    const [mounted, setMounted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + items.length) % items.length);
            if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % items.length);
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

    // Force play on iOS Safari
    useEffect(() => {
        if (isOpen && videoRef.current && items[currentIndex].type === "video") {
            const playVideo = async () => {
                try {
                    await videoRef.current?.play();
                } catch (err) {
                    console.log("Auto-play blocked, waiting for interaction or keep muted");
                }
            };
            playVideo();
        }
    }, [isOpen, currentIndex, items]);

    if (!isOpen || !mounted) return null;

    const currentItem = items[currentIndex];

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        onNavigate((currentIndex - 1 + items.length) % items.length);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        onNavigate((currentIndex + 1) % items.length);
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 transition-opacity duration-300"
            onClick={onClose}
        >
            <button
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
                onClick={onClose}
            >
                <X size={32} />
            </button>

            {items.length > 1 && (
                <>
                    <button
                        className="absolute left-6 text-white/50 hover:text-white transition-colors z-[110] hidden md:block"
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={48} />
                    </button>
                    <button
                        className="absolute right-6 text-white/50 hover:text-white transition-colors z-[110] hidden md:block"
                        onClick={handleNext}
                    >
                        <ChevronRight size={48} />
                    </button>
                </>
            )}

            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
                {currentItem.type === "image" ? (
                    <div className="relative w-full h-full max-w-5xl max-h-[85vh]">
                        <Image
                            src={currentItem.src}
                            alt={currentItem.title || "Gallery image"}
                            fill
                            className="object-contain"
                            priority
                            sizes="100vw"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center bg-black">
                        <video
                            ref={videoRef}
                            key={currentItem.src}
                            controls
                            playsInline
                            muted
                            preload="auto"
                            className="max-w-full max-h-full"
                        >
                            <source src={currentItem.src} type="video/mp4" />
                        </video>
                    </div>
                )}

                {currentItem.title && (
                    <div className="absolute bottom-8 left-0 right-0 text-center px-6 max-w-4xl mx-auto">
                        <p className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-light mb-2">
                            {currentItem.title}
                        </p>
                        {currentItem.subtitle && (
                            <p className="text-white/40 text-[9px] tracking-[0.2em] uppercase font-light mb-4">
                                {currentItem.subtitle}
                            </p>
                        )}
                        {currentItem.description && (
                            <p className="text-white/30 text-xs font-light leading-relaxed max-w-2xl mx-auto hidden md:block">
                                {currentItem.description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
