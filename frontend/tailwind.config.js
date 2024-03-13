/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
  "./src/**/*.{html,js,ts,jsx,tsx}",
  'node_modules/flowbite-react/lib/esm/**/*.js',
],
  theme: {
    extend: {
      keyframes: {
        bounce200: {
          '0%, 20%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '21%, 99%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        bounce200: 'bounce200 2s infinite',
      },
      fontFamily: {
       rocksalt: ['Rock Salt', 'cursive'],
       sil: ['Shadows Into Light', 'cursive'],
       pop: ['Poppins', 'sans-serif']
      },
      colors: {
        'color1': '#0B0C10',
        'color2': '#1F2833',
        'color3': '#C5C6C7',
        'color4': '#66FCF1',
        'color5': '#45A29E',
        'affirm': '#24EC1C',
        'caution': '#FDE047'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    })
  ],
}

