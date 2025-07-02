/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f7f3',
          100: '#f1efe8',
          200: '#e4dfd1',
          300: '#d5ceb8',
          400: '#c5bc9f',
          500: '#b6a988',
          600: '#a69878',
          700: '#8a7d64',
          800: '#706652',
          900: '#5a5343',
          950: '#2e2a22',
        },
        secondary: {
          50: '#f5f8f6',
          100: '#deeae2',
          200: '#bfd7c8',
          300: '#9abba5',
          400: '#749e85',
          500: '#5b856c',
          600: '#456a54',
          700: '#385545',
          800: '#2f4539',
          900: '#273930',
          950: '#122019',
        },
        accent: {
          50: '#fef7ee',
          100: '#fdead6',
          200: '#fad3ad',
          300: '#f6b578',
          400: '#f29042',
          500: '#ef7424',
          600: '#de5818',
          700: '#b83d16',
          800: '#93321a',
          900: '#772b18',
          950: '#41140b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};