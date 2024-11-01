/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary-color': '#e6e6ef',
      'secondary-color': "#0c1219",
      'tertiary-color': "#121c26",
      'tertiary-color-faded': "#202933",
      "accent-color-main": "#9dfb56",
      'accent-color-main-faded': '#374030',
      "accent-color-secondary": "#78d3f8",
      "accent-color-secondary-faded": "#3c697c",
      'grey': "#2C2C2C",
      'grey-opacity': '#2c2c2c3b',
      'grey-border-color': "#2b3540",
      'light-grey': "#b0b3c1",
      'table-hover': '#202933'
    },
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "Inter",
          "system-ui",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ],
      },
      keyframes: {
        slide: {
          '0%' : {left: '-30%'},
          '50%': {left: '50%'},
          '100%': {left: '100%'},
        },
      },
      animation: {
        slide: 'slide 3.0s linear infinite',
      }
    },
    plugins: [],
  }
}