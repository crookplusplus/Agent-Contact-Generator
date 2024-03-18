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
       pop: ['Poppins', 'sans-serif'],
       teko: ['Teko', 'sans-serif'],
       madimi: ['Madimi One', 'sans-serif'],
       fjalla: ['Fjalla One', 'sans-serif'],
      },
      colors: {
        'color1': '#0B0C10',
        'color2': '#1F2833',
        'color3': '#C5C6C7',
        'color4': '#66FCF1',
        'color5': '#45A29E',
        'ice': '#87FDF5',
        'gold1': '#D2AC47',
        'gold2': '#F7EF8A',
        'gold3': '#AE8625',
        'gold4': '#926F34',
        'gold5': '#DFBD69',
        'silver1': '#C0C0C3',
        'silver2': '#CBCCCD',
        'silver3': '#E3E3E3',
        'silver4': '#696969',
        'silver5': '#A8A9AD',
        'whitesmoke': '#F5F5F5',
        'silversurf':'C1C2C3',
        'timberwolf' : '#D7CDCC',
        'robinsegg': '#04C8BB',
        'affirm': '#24EC1C',
        'caution': '#FDE047',
        'error': '#FF3333',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    })
  ],
}

