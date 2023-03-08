/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        maxWidth: {
          '1/2': '50%',
        }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
