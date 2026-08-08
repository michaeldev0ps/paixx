/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#090909',
        secondary: '#F5F5F5',
        accent: '#7E0E12',
      },
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'cinzel': ['Cinzel', 'serif'],
      },
      spacing: {
        'generous': '4rem',
        'luxury': '6rem',
      },
    },
  },
  plugins: [],
}
