/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary-color': '#FEFEFE',
      'secondary-color': "#0A0A0A",
      'tertiary-color': "#141414",
      "accent-color-main": "#EB6B44",
      "accent-color-secondary": "#7E67F6",
      "accent-color-secondary-faded": "#37305c",
      'grey': "#2C2C2C",
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
    },
    plugins: [],
  }
}