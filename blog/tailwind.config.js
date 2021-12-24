const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
}
