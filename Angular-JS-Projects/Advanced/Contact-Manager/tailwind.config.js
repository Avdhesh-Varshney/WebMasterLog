/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        blur: "rgba(0, 0, 0, 0.5)"
      }
    },
  },
  plugins: [],
};

