module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          light: '#ffffff',
          primary: '#dde3e6',
          bold: '#1d2b37',
          semi: '#5b646b',
          secondary: '#81878e',
        },
        pink: {
          main: '#b615b0',
        },
      },
    },
    fontFamily: {
      body: ['Roboto'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
