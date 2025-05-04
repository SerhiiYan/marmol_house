/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f9c615",
        dark: "#17253c",
      },
    },
  },
  plugins: [],
}
