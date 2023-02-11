/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#1e3c72',
        'weather-secondary': '#2a5298',
      },
    },
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screns: {
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
};
