/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary-color': '#FEFEFE',
      'secondary-color': "#060E0E",
      'tertiary-color': "#121c26", 
      "accent-color-main": "#00FFA7",
      'accent-color-main-faded': '#122c1c',
      "accent-color-secondary": "#7E67F6",
      "accent-color-secondary-faded": "#37305c",
      'grey': "#2C2C2C",
      'grey-opacity': '#2c2c2c3b',
      'light-grey': "#666666"


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
        slideFromLeft: {
          '0%': {width: '70px'},
          '100%': {width: '220px'}
        },
        slideOutLeft: {
          '0%': {width: '220px'},
          '100%': { width: '70px'}
        }
      },
      animation: {
        slideFromLeft: 'slideFromLeft 0.1s ease-in forwards',
        slideOutLeft: 'slideOutLeft 0.1s ease-in forwards'
      }
    },
    plugins: [],
  }
}