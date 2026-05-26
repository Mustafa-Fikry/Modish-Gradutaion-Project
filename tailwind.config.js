/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'modish-bg': '#F9F9F9',
        'modish-brown': '#A48A84',
        'modish-dark': '#524B6B',
      },
    },
  },
  plugins: [],
}