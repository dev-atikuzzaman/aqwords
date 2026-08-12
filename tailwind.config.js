/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Noto Serif Bengali"', 'serif'],
        body: ['"Hind Siliguri"', '"Inter"', 'sans-serif'],
        ui: ['"Inter"', '"Hind Siliguri"', 'sans-serif'],
        arabic: ['"Amiri"', '"Scheherazade New"', 'serif'],
      },
      colors: {
        ink: {
          950: '#0A0D18',
          900: '#0F1220',
          800: '#171B2E',
          700: '#20263D',
          600: '#2B324D',
        },
        parchment: {
          100: '#F7F3E8',
          200: '#EDEAE0',
          300: '#D9D4C4',
          400: '#9CA3C4',
        },
        gold: {
          300: '#E8C77E',
          400: '#D4A857',
          500: '#C1943F',
          600: '#A67A2E',
        },
        emerald2: {
          400: '#4ADE80',
          500: '#22C55E',
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(212, 168, 87, 0.35)',
        card: '0 4px 24px -4px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at 50% 0%, rgba(212,168,87,0.12), transparent 60%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        rise: 'rise 0.5s ease-out',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        rise: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulseSlow: { '0%,100%': { opacity: 0.6 }, '50%': { opacity: 1 } },
      },
    },
  },
  plugins: [],
}
