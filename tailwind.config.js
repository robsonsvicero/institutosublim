/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#DFFF66',
          500:'#BCFF00',
          700: '#7DB700',
        },
        'primary-dark': '#005D02',
        'text-dark': '#333333',
        neutral: {
          light: '#F6F7F8',
          DEFAULT: '#F1F3F4',
        },
        'verde-agua': '#24AD85',
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#24AD85',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
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