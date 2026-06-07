// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // si usas Next.js con app router
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      fontFamily: {
        serif: ["cookie", "serif"],
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }), // 👈 importante
  ],

  variants: {
    scrollbar: ["rounded"], // 👈 habilita variantes para el scrollbar
  },
}
