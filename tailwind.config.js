const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      coolGray: colors.coolGray,
      white: colors.white,
      black: colors.black,
      orange: colors.orange,
      blue: colors.blue,
      red: colors.red,
      green: colors.green,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
