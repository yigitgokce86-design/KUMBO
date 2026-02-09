import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#F0FDFA', // Teal-50 (Minty white)
                foreground: '#064E3B', // Emerald-900 (Deep Forest Green)
                card: {
                    DEFAULT: '#FFFFFF',
                    foreground: '#064E3B'
                },
                popover: {
                    DEFAULT: '#FFFFFF',
                    foreground: '#064E3B'
                },
                primary: {
                    DEFAULT: '#10B981', // Emerald-500 (Vibrant Action)
                    foreground: '#FFFFFF'
                },
                secondary: {
                    DEFAULT: '#D1FAE5', // Emerald-100 (Soft Green)
                    foreground: '#065F46' // Emerald-800
                },
                muted: {
                    DEFAULT: '#F1F5F9', // Slate-100
                    foreground: '#64748B' // Slate-500
                },
                accent: {
                    DEFAULT: '#FDE68A', // Amber-200 (Warmth/Badges)
                    foreground: '#92400E' // Amber-800
                },
                destructive: {
                    DEFAULT: '#EF4444',
                    foreground: '#FFFFFF'
                },
                border: '#A7F3D0', // Emerald-200 (Soft borders)
                input: '#F0FDFA', // Match background
                ring: '#10B981', // Emerald-500
                chart: {
                    '1': '#10B981',
                    '2': '#34D399',
                    '3': '#6EE7B7',
                    '4': '#A7F3D0',
                    '5': '#D1FAE5'
                }
            },
            borderRadius: {
                lg: '1.5rem',
                md: '1rem',
                sm: '0.5rem'
            },
            fontFamily: {
                sans: ['var(--font-quicksand)', 'sans-serif'],
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
