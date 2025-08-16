//  TODO: Move these into helpers
const Color = require("color");

// TODO: Move this to config file
// const customColors = {
//   primary900: "#1C64F2" ,
// };

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,css}",
    "./src/components/**/*.{js,ts,jsx,tsx,css}",
    "./src/atoms/**/*.{js,ts,jsx,tsx,css}",
    "./src/molecules/**/*.{js,ts,jsx,tsx,css}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,css}",
    "./src/organisms/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      screens: {
        phone: "375px", // => @media (min-width: 640px) { ... }
        tablet: "640px", // => @media (min-width: 640px) { ... }
        laptop: "1024px", // => @media (min-width: 1024px) { ... }
        desktop: "1280px", // => @media (min-width: 1280px) { ... }
      },
      colors: {
        primary: {
          50: "#EBF5FF",
          100: "#E1EFFE",
          200: "#C3DDFD",
          300: "#A4CAFE",
          400: "#76A9FA",
          500: "#3F83F8",
          600: "#1C64F2",
          700: "#1A56DB",
          800: "#1E429F",
          900: "#233876",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2A37",
          900: "#111928",
        },
        green: {
          50: "#F3FAF7",
          100: "#DEF7EC",
          200: "#BCF0DA",
          300: "#84E1BC",
          400: "#31C48D",
          500: "#0E9F6E",
          600: "#057A55",
          700: "#046C4E",
          800: "#03543F",
          900: "#014737",
        },
      },
    },
  },
  plugins: [],
};
