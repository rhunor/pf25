/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mont: ["var(--font-dm-sans)", ...fontFamily.sans],
        heading: ["var(--font-cormorant)", ...fontFamily.serif],
      },
      colors: {
        dark: "#141210",
        light: "#f5f0e8",
        primary: "#9b7640",
        primaryDark: "#c9a55a",
        lightGreen: "#c9a55a",
        slideGreen: "#7a5c2e",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
      backgroundImage: {
        circularLight:
          "repeating-radial-gradient(rgba(0,0,0,0.3) 2px,#f5f0e8 5px,#f5f0e8 100px)",
        circularDark:
          "repeating-radial-gradient(rgba(255,255,255,0.4) 2px,#141210 8px,#141210 100px)",
        circularLightLg:
          "repeating-radial-gradient(rgba(0,0,0,0.3) 2px,#f5f0e8 5px,#f5f0e8 80px)",
        circularDarkLg:
          "repeating-radial-gradient(rgba(255,255,255,0.4) 2px,#141210 8px,#141210 80px)",
        circularLightMd:
          "repeating-radial-gradient(rgba(0,0,0,0.3) 2px,#f5f0e8 5px,#f5f0e8 60px)",
        circularDarkMd:
          "repeating-radial-gradient(rgba(255,255,255,0.4) 2px,#141210 8px,#141210 60px)",
        circularLightSm:
          "repeating-radial-gradient(rgba(0,0,0,0.3) 2px,#f5f0e8 5px,#f5f0e8 40px)",
        circularDarkSm:
          "repeating-radial-gradient(rgba(255,255,255,0.4) 2px,#141210 8px,#141210 40px)",
      },
      boxShadow: {
        "3xl": "0 15px 15px 1px rgba(155,118,64, 0.3)",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      xs: { max: "479px" },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
