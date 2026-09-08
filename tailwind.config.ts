import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080B11",
        surface: {
          DEFAULT: "#0F1420",
          card: "#141C2E",
          hover: "#1A253D",
          border: "#1E2C4A",
          active: "#25365C",
        },
        fyre: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          glow: "#FF4500",
        },
        accent: {
          amber: "#F59E0B",
          emerald: "#10B981",
          rose: "#F43F5E",
          cyan: "#06B6D4",
          indigo: "#6366F1",
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(249, 115, 22, 0.3)",
        "glow-lg": "0 0 40px -8px rgba(249, 115, 22, 0.45)",
        "glow-emerald": "0 0 25px -5px rgba(16, 185, 129, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "fyre-gradient": "linear-gradient(135deg, #FF6B00 0%, #F97316 50%, #EF4444 100%)",
        "fyre-glow": "radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.15) 0%, transparent 70%)",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
