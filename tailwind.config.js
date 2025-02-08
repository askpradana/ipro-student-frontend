/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          50: '#EFF6FF', // blue-50
          600: '#2563EB', // blue-600
        },
        secondary: {
          DEFAULT: '#6B7280', // gray-500
          50: '#F9FAFB', // gray-50
        },
      },
    },
  },
  plugins: [],
}
