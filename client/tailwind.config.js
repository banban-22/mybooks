/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f66a54',
        'primary-light': '#fcd2cd',
        'primary-bg-light': '#FEEAE8',
      },
      content: {
        logotext: "url('./src/assets/MyBooks.svg')",
      },
      boxShadow: {
        modal: '1px 1px 20px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
