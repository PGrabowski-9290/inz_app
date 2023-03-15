// tailwind.config.js
const colors = require("tailwindcss/colors")

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
        'gray-a60': '#4D4D4D99',
        green: colors.green,
        danger: colors.yellow,
        warning: colors.red
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@vechaiui/core")({
      colors: ["green","indigo", "warning", "danger"]
    }),
  ],
  important: true,
};
