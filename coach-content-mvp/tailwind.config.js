/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5b7cfa',
          dark: '#3d5fe6',
        },
      },
    },
  },
  plugins: [],
}