import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
            },
            colors: {
                "brand-black": "#111111",
                "brand-gray": "#888888",
                "brand-light-gray": "#e0e0e0",
                "brand-white": "#ffffff",
            },
            letterSpacing: {
                widest2: "0.25em",
            },
            transitionDuration: {
                "400": "400ms",
            },
        },
    },
    plugins: [],
};

export default config;
