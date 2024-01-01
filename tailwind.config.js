/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Inter", "sans-serif"],
        plain: ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
