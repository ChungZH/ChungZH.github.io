/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./themes/**/layouts/**/*.html",
    "./themes/**/layouts/**/**/*.html",
    "./content/**/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
