/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#333446',
        secondary: '#7F8CAA',
        tertiary: '#B8CFCE',
        neutral: '#EAEFEF',
      },
    },
  },
  plugins: [],
}

