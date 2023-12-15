/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f66a54',
        'primary-light': '#fcd2cd',
      },
    },
  },
  plugins: [],
};
