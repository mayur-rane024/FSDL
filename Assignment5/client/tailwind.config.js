/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00c2ff',
        accent: '#ff7a18',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(31, 38, 135, 0.2)',
      },
      animation: {
        floatIn: 'floatIn 0.6s ease-out both',
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
