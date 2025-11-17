/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9FFF00',
        'primary-dark': '#00420D',
        'text-dark': '#333333',
        neutral: {
          light: '#F6F7F8',
          DEFAULT: '#F1F3F4'
        },
        footer: '#101828'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      fontSize: {
        'h1': ['64px', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['56px', { lineHeight: '1.15', fontWeight: '700' }],
        'h3': ['48px', { lineHeight: '1.25', fontWeight: '700' }],
        'h6': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '1.5' }],
        'small': ['14px', { lineHeight: '1.5' }],
        'header': ['18px', { lineHeight: '1.4', fontWeight: '600' }]
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(16, 24, 40, 0.06)'
      }
    }
  },
  plugins: []
}