import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#E67E22",
                    50: "#FFF5EB",
                    100: "#FFE6CC",
                    200: "#FFCD99",
                    300: "#FFB366",
                    400: "#FF9A33",
                    500: "#E67E22",
                    600: "#D35400",
                    700: "#A04000",
                    800: "#6E2C00",
                    900: "#3B1800",
                },
                brand: {
                    DEFAULT: "#E67E22",
                    orange: "#E67E22",
                }
            },
            fontFamily: {
                sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
                serif: ["var(--font-poppins)", "Georgia", "serif"],
                mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
} satisfies Config;
