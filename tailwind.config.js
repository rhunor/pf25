/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mont: ["var(--font-dm-sans)", ...fontFamily.sans],
        heading: ["var(--font-grotesk)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      colors: {
        dark: "#141210",
        light: "#f5f0e8",
        primary: "#9b7640",
        primaryDark: "#c9a55a",
        // surfaces one step off the page background, for cards and panels
        paper: "#fbf8f2",
        ink: "#1c1915",
      },
    },
    // desktop-first: each breakpoint applies at that width and below
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      xs: { max: "479px" },
    },
  },
  plugins: [],
};
