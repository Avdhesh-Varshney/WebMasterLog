/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'rgba': 'rgba(0, 0, 0, 0.5)'
      },
    },
  },
  plugins: [],
}

