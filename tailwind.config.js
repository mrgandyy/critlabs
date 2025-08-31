/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#0B0D10",
        mint: "#38FFC9",
        cyan: "#7DF9FF",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.06)",
        card: "0 12px 40px rgba(0,0,0,0.10)",
      },
      borderRadius: { "2xl": "1.25rem" },
      fontFamily: { sans: ["var(--font-sans)"] },
      container: { center: true, padding: "1rem" },
    },
  },
  plugins: [],
};
