/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        type: "type 1.8s ease-out .8s 1 normal both",
        "type-reverse": "type 1.8s ease-out 0s infinite alternate-reverse both"
      },
      fontFamily: {
        nanum: ["Nanum Gothic", "sans-serif"]
      }
    }
  },
  plugins: [require("daisyui"), require("@tailwindcss/aspect-ratio")]
}
