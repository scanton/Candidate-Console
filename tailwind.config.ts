import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
      },
      borderRadius: {
        lg: "0.875rem",
        md: "0.625rem",
        sm: "0.375rem",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "Avenir Next", "Segoe UI", "sans-serif"],
        serif: ["Iowan Old Style", "Baskerville", "Times New Roman", "serif"],
      },
      boxShadow: {
        soft: "0 6px 24px -18px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
