/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nanum: ["Nanum Gothic", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/aspect-ratio")]
}
