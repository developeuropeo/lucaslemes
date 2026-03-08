"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
    src: string;
    className?: string;
    onMouseEnter?: (e: React.MouseEvent<HTMLVideoElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLVideoElement>) => void;
}

export default function LazyVideo({ src, className, onMouseEnter, onMouseLeave }: LazyVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasInteraction, setHasInteraction] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && videoRef.current) {
                    // Start loading metadata when visible
                    videoRef.current.load();
                }
            },
            { threshold: 0.1 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="metadata"
            poster={`${src}#t=0.1`}
            className={className}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <source src={`${src}#t=0.1`} type="video/mp4" />
        </video>
    );
}
