/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agro-green': '#047857',
        'agro-dark': '#0f172a',
        'agro-light': '#f8fafc',
      },
      fontFamily: {
        'sans': ['Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-sm': 'bounceSm 1.4s infinite',
      },
      keyframes: {
        slideIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bounceSm: {
          '0%, 80%, 100%': { transform: 'scaleY(1)' },
          '40%': { transform: 'scaleY(0.4)' },
        },
      },
    },
  },
  plugins: [],
}
