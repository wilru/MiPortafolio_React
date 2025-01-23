/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1a237e',
          secondary: '#3949ab',
          accent: '#42a5f5',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }