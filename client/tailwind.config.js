// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}", // path to vechaiui
  ],
  mode: "jit",
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'gray-a60': '#4D4D4D99'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@vechaiui/core"),
  ],
  important: true,
};
