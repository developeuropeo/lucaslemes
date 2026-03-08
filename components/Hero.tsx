"use client";

import { useState, useEffect, useRef } from "react";

interface HeroProps {
    t: {
        showreel: string;
    };
    videoSources: string[];
}

export default function Hero({ t, videoSources }: HeroProps) {
    const [videoSrc, setVideoSrc] = useState(videoSources[0] || "/videos/themountainpartII.mp4");
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoSources.length > 0) {
            const randomVideo = videoSources[Math.floor(Math.random() * videoSources.length)];
            setVideoSrc(randomVideo);

            if (videoRef.current) {
                videoRef.current.load();
            }
        }
    }, [videoSources]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            {/* Local video — zero player UI */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                key={videoSrc}
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={`${videoSrc}#t=0.001`} type="video/mp4" />
            </video>

            {/* Gradient overlay — cinematic dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

            {/* Bottom label */}
            <div className="absolute bottom-10 left-6 md:left-12 z-10 flex items-end gap-8">
                <div>
                    <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-light mb-1">
                        {t.showreel}
                    </p>
                    <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase font-light">
                        2024
                    </p>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 right-6 md:right-12 z-10 flex items-center gap-3 text-white/30">
                <span className="text-[10px] tracking-[0.3em] uppercase font-light">Scroll</span>
                <span className="text-xs animate-bounce">↓</span>
            </div>
        </section>
    );
}
