/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'deep-blue': '#010026',
        'blue-grey': '#546E7A',
        blue: '#2CBCE9',
        red: '#781423',
        yellow: '#FDCC49',
        grey: '#23272e',
        'light-grey': '#EBECF0',
      },
      backgroundImage: (theme) => ({
        'gradient-predawn': 'linear-gradient(90deg, #FFA17F, #00223E)',
        'gradient-shore': 'linear-gradient(90deg, #70e1f5, #ffd194)',
        'gradient-starfall': 'linear-gradient(90deg, #f0c27b, #4b1248)',
        'gradient-orange': 'linear-gradient(90deg, #EA5A6F, #DE791E, #FCCF3A)',
      }),
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [],
};
