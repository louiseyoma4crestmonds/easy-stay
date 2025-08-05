//  TODO: Move these into helpers
const Color = require("color");

// TODO: Move this to config file
const customColors = {
  primary600: "#1C64F2",
};

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
        primary600: customColors.primary600,
      },
    },
  },
  plugins: [],
};
