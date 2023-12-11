/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
  "./src/**/*.{html,js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      fontFamily: {
       rocksalt: ['Rock Salt', 'cursive'],
       sil: ['Shadows Into Light', 'cursive']
      },
      colors: {
        'color1': '#0B0C10',
        'color2': '#1F2833',
        'color3': '#C5C6C7',
        'color4': '#66FCF1',
        'color5': '#45A29E'
      },
    },
  },
  plugins: [],
}

