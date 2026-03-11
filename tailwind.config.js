/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          300: '#64b5f6',
          500: '#1E88E5',
          700: '#1565c0',
          900: '#0d47a1',
        },
        secondary: {
          50: '#e8f5e9',
          300: '#81c784',
          500: '#43A047',
          700: '#388e3c',
          900: '#1b5e20',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'md': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'lg': '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

