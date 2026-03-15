/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f4f0ea",
        ink: "#1f1d1a",
        muted: "#81786d",
        stone: "#b9ac9a",
        line: "#cfc4b6",
        panel: "rgba(255,255,255,0.6)",
      },
      fontFamily: {
        display: ["Iowan Old Style", "Palatino Linotype", "Book Antiqua", "serif"],
        sans: ["Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        paper: "0 18px 45px rgba(31, 29, 26, 0.08)",
      },
      letterSpacing: {
        card: "0.08em",
      },
    },
  },
  plugins: [],
};
