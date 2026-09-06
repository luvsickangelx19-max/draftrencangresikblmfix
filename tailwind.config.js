/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'mascot-fly': {
          '0%, 100%': { transform: 'translateX(-20px)' },
          '50%': { transform: 'translateX(20px)' },
        },
      },
      animation: {
        'mascot-fly': 'mascot-fly 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
