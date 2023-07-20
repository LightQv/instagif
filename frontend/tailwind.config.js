/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        spartan: ["var(--font-spartan)"],
      },
      colors: {
        dust: ["var(--dust)"],
        dustparent: ["var(--dust-transparent)"],
        sand: ["var(--sand)"],
        cobble: ["var(--cobble)"],
        cobbleparent: ["var(--cobble-transparent)"],
        granite: ["var(--cobble-light)"],
      },
    },
  },
  plugins: [],
};
