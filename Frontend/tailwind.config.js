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

      transitionTimingFunction: {
        custom: 'cubic-bezier(0.7, 0, 0.84, 0)',
      },

      fontFamily: {
        jakarta: 'Plus Jakarta Sans, sans-serif',
        zodiak: 'Zodiak , serif ',
      },

      keyframes: {
        'shift-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-3px)' },
        },
        'shift-down': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2px)' },
        },
      },
      animation: {
        'shift-up': 'shift-up 0.3s ease-out forwards',
        'shift-down': 'shift-down 0.1s ease-out forwards',
      },
    },
  },
  plugins: [],
};
