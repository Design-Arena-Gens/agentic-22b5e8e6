/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f7',
          100: '#ffe4ef',
          200: '#ffc9df',
          300: '#ffa1c6',
          400: '#ff6aa2',
          500: '#f43f7e',
          600: '#e11d64',
          700: '#be184f',
          800: '#9f1744',
          900: '#881337'
        }
      }
    }
  },
  plugins: [],
};
