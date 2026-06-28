/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        'fie-bg': {
          primary: '#0B0E14',
          secondary: '#111827',
          card: '#151A25',
          'card-hover': '#1A2030',
        },
        'fie-accent': {
          teal: '#00D4A0',
          blue: '#3B82F6',
          danger: '#FF3B5C',
          warning: '#FFB020',
          success: '#00E676',
          purple: '#8B5CF6',
        },
        'fie-text': {
          primary: '#E2E8F0',
          secondary: '#94A3B8',
          muted: '#64748B',
          dim: '#475569',
        },
        'fie-border': {
          primary: '#1E2940',
          hover: '#2D3E5C',
          accent: '#00D4A0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        fie: '16px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "live-pulse": {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(255, 59, 92, 0.6)" },
          "70%": { transform: "scale(1.15)", boxShadow: "0 0 0 10px rgba(255, 59, 92, 0)" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(255, 59, 92, 0)" },
        },
        "score-flash": {
          "0%": { transform: "scale(1)", filter: "brightness(1)" },
          "50%": { transform: "scale(1.2)", filter: "brightness(2)" },
          "100%": { transform: "scale(1)", filter: "brightness(1)" },
        },
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width, 100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "live-pulse": "live-pulse 2s ease-in-out infinite",
        "score-flash": "score-flash 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "progress-fill": "progress-fill 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
