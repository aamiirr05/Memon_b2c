/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkgreen: '#386641',
        peach: '#F2E8CF',
        maroon: '#BC4749',
        mediumgreen: '#6A994E',
        lightgreen: '#A7C957',
        lightpeach: '#EBE6D8',
      },

      fontFamily: {
        jakarta: 'Plus Jakarta Sans, sans-serif',
        zodiak: 'Zodiak , serif ',
      },
    },
  },
  plugins: [],
};
