/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
        anto: ["Anton SC", 'sans-serif'] 
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(rgba(27, 30, 36, 0) 0%, rgb(27, 30, 36) 84.21%)',
      },
      colors: {
        'dark-start': 'rgba(27, 30, 36, 0)',
        'dark-end': 'rgb(27, 30, 36)',
      }
    },
  },
  plugins: [],
};
