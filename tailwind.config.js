module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fill: (theme) => ({
      red: theme("colors.red.500"),
      green: theme("colors.green.500"),
      blue: theme("colors.blue.500"),
      gray: theme("colors.gray.500"),
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
