/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
  typing: {
    "0%": { width: "0%" },
    "100%": { width: "100%" },
  },
  slideDown: {
    "0%": { transform: "translateY(-50px)", opacity: 0 },
    "100%": { transform: "translateY(0)", opacity: 1 },
  },
  blink: {
    "50%": { borderColor: "transparent" },
  },
  shine: {
    "0%": { backgroundPosition: "200% 0" },
    "100%": { backgroundPosition: "-200% 0" },
  },
  flow: {
    "0%": { backgroundPosition: "200% 0" },
    "100%": { backgroundPosition: "-200% 0" },
  },
  slideUp: {
    "0%": { transform: "translateY(50px)", opacity: 0 },
    "100%": { transform: "translateY(0)", opacity: 1 },
  },
  shake: {
    "0%, 100%": { transform: "translateX(0)" },
    "25%": { transform: "translateX(-5px)" },
    "50%": { transform: "translateX(5px)" },
    "75%": { transform: "translateX(-5px)" },
  },
},
animation: {
  typing: "typing 0.3s steps(30, end) forwards", // Faster typing animation
  blink: "blink 0.9s step-end infinite",
  flow: "flow 3s linear infinite",
  shine: "shine 3s linear infinite",
  slideUp: "slideUp 1s ease-out",
  slideDown: "slideDown 1s ease-in-out",
  shake: "shake 0.5s ease-in-out infinite", // Shaking animation
},

    },
  },
  plugins: [require("tailwindcss-animate")],
};
