/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary-color': '#e6e6ef',
      'secondary-color': "#11121a",
      'tertiary-color': "#11121a",
      'tertiary-color-faded': "#202933",
      "accent-color-main": "#5e63ff",
      'accent-color-main-faded': '#222533',
      "accent-color-secondary": "#7E67F6",
      "accent-color-secondary-faded": "#37305c",
      'grey': "#2C2C2C",
      'grey-opacity': '#2c2c2c3b',
      'grey-border-color': "rgb(43, 53, 64)",
      'light-grey': "#b0b3c1"


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