const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: {
          DEFAULT: "hsl(var(--border))",
          alt: "hsl(var(--border-alt))",
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          alt: "hsl(var(--input-alt))",
        },
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          alt: "hsl(var(--background-alt))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          alt: "hsl(var(--foreground-alt))",
          "alt-2": "hsl(var(--foreground-alt-2))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          alt: "hsl(var(--primary-alt))",
          "alt-2": "hsl(var(--primary-alt-2))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          alt: "hsl(var(--secondary-alt))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          alt: "hsl(var(--destructive-alt))",
        },
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        popover: "hsl(var(--popover))",
        card: "hsl(var(--card))",
      },
      keyframes: {
        slideRight: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0px)" },
        },
      },
      animation: {
        slideRight: "slideRight 0.5s linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
