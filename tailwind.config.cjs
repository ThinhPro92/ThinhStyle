/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF7ED",
          500: "#F59E0B", // accent chính
          600: "#D97706",
          900: "#451A03",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          400: "#94A3B8",
          500: "#64748B",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A", // nền header
          950: "#020617", // nền footer
        },
        header: "#0F172A",
        footer: "#020617",
        accent: "#F59E0B",
        "text-primary": "#FFFFFF",
        "text-secondary": "#CBD5E1",
        "text-muted": "#94A3B8",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // hoặc dùng font Việt hóa như Manrope, Urbanist
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
