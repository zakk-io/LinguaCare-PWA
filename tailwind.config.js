/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#171C26', // Dark Charcoal
        'primary': '#38C1B3', // Bright Teal/Cyan
        'card': '#1E293B', // SaaS Card Color
        'text-light': '#E2E8F0',
        'text-dark': '#94A3B8',
        'status-green': '#38A169',
        'status-red': '#E53E3E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
