module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active', 'hover'],
      ringWidth: ['active', 'hover'],
      ringColor: ['active', 'hover'],
      borderWidth: ['active', 'hover'],
    },
  },
  plugins: [],
};
