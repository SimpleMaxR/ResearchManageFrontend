/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          400: '#8CC7A1',
          500: '#6CBF84',
          600: '#4CAE64',
          700: '#3A8D4A',
        },
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        normal: '500',
        medium: '500',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

