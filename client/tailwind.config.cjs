/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "dark-purple":"#081A51",
      },
    }
  },
  plugins: [],
}